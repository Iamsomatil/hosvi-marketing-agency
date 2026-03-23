import { NextResponse } from "next/server";
import { Resend } from "resend";
import { storeContactSubmission } from "@/lib/contact-submissions";
import { getSmsPermissions, sendAllowedSmsMessages } from "@/lib/sms";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const CONTACT_RECIPIENT_EMAIL =
  process.env.CONTACT_RECIPIENT_EMAIL || "samson@hosvi.com";
const DEFAULT_CONTACT_SENDER_EMAIL = "onboarding@resend.dev";
const CONTACT_SENDER_EMAIL =
  process.env.CONTACT_SENDER_EMAIL || DEFAULT_CONTACT_SENDER_EMAIL;

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
};

const sendAdminNotification = async ({
  resend,
  name,
  company,
  email,
  phone,
  message,
  smsMarketingConsent,
  smsNonMarketingConsent,
  smsPermissions,
  timestamp,
  sourceUrl,
  ip,
  userAgent,
}: {
  resend: Resend;
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  smsMarketingConsent: boolean;
  smsNonMarketingConsent: boolean;
  smsPermissions: ReturnType<typeof getSmsPermissions>;
  timestamp: string;
  sourceUrl: string;
  ip: string;
  userAgent: string;
}) => {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Company:</strong> ${company || "Not provided"}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>SMS Marketing Consent:</strong> ${
      smsMarketingConsent ? "Yes" : "No"
    }</p>
    <p><strong>SMS Non-Marketing Consent:</strong> ${
      smsNonMarketingConsent ? "Yes" : "No"
    }</p>
    <p><strong>Allow Marketing SMS:</strong> ${
      smsPermissions.allowMarketingSms ? "Yes" : "No"
    }</p>
    <p><strong>Allow Service-Related SMS:</strong> ${
      smsPermissions.allowServiceRelatedSms ? "Yes" : "No"
    }</p>
    <p><strong>Timestamp:</strong> ${timestamp}</p>
    <p><strong>Source URL:</strong> ${sourceUrl || "Not provided"}</p>
    <p><strong>IP Address:</strong> ${ip || "unknown"}</p>
    <p><strong>User Agent:</strong> ${userAgent}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const primarySend = await resend.emails.send({
    from: `Hosvi Contact <${CONTACT_SENDER_EMAIL}>`,
    to: CONTACT_RECIPIENT_EMAIL,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html,
  });

  if (!primarySend.error) {
    return;
  }

  if (CONTACT_SENDER_EMAIL === DEFAULT_CONTACT_SENDER_EMAIL) {
    throw primarySend.error;
  }

  console.error(
    "Primary admin email sender failed. Retrying with Resend fallback sender:",
    primarySend.error
  );

  const fallbackSend = await resend.emails.send({
    from: `Hosvi Contact <${DEFAULT_CONTACT_SENDER_EMAIL}>`,
    to: CONTACT_RECIPIENT_EMAIL,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html,
  });

  if (fallbackSend.error) {
    throw fallbackSend.error;
  }
};

const verifyRecaptcha = async (token: string, ip: string) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("Missing RECAPTCHA_SECRET_KEY");
    return {
      ok: false,
      status: 503,
      message: "Form verification is unavailable. Please try again later.",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip && ip !== "unknown") {
    body.append("remoteip", ip);
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("reCAPTCHA verification request failed:", response.status);
      return {
        ok: false,
        status: 502,
        message: "Captcha verification failed. Please try again.",
      };
    }

    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!result.success) {
      console.error("reCAPTCHA rejected submission:", result["error-codes"]);
      return {
        ok: false,
        status: 400,
        message: "Captcha verification failed. Please try again.",
      };
    }

    return { ok: true, status: 200, message: "verified" };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      ok: false,
      status: 502,
      message: "Captcha verification failed. Please try again.",
    };
  }
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const {
      name,
      email,
      phone,
      message,
      company,
      website,
      smsMarketingConsent,
      smsNonMarketingConsent,
      sourceUrl,
      captchaToken,
    } =
      await request.json();

    // Basic validation
    if (!name || !email || !message || !captchaToken) {
      return NextResponse.json(
        { error: "Name, email, message, and captcha verification are required" },
        { status: 400 }
      );
    }

    if (
      String(name).length > 120 ||
      String(email).length > 254 ||
      String(phone || "").length > 40 ||
      String(company || "").length > 160 ||
      String(sourceUrl || "").length > 2000 ||
      String(message).length > 4000
    ) {
      return NextResponse.json(
        { error: "Invalid input length" },
        { status: 400 }
      );
    }

    if (website) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    const normalizedPhone = String(phone || "");
    const normalizedSourceUrl = String(
      sourceUrl || request.headers.get("referer") || ""
    );
    const normalizedSmsMarketingConsent = smsMarketingConsent === true;
    const normalizedSmsNonMarketingConsent = smsNonMarketingConsent === true;
    const timestamp = new Date().toISOString();
    const smsPermissions = getSmsPermissions({
      smsMarketingConsent: normalizedSmsMarketingConsent,
      smsNonMarketingConsent: normalizedSmsNonMarketingConsent,
    });

    const recaptchaResult = await verifyRecaptcha(String(captchaToken), ip);
    if (!recaptchaResult.ok) {
      return NextResponse.json(
        { error: recaptchaResult.message },
        { status: recaptchaResult.status }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Message service unavailable. Please try again later." },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);

    await storeContactSubmission({
      name: String(name),
      email: String(email),
      phone: normalizedPhone,
      message: String(message),
      smsMarketingConsent: normalizedSmsMarketingConsent,
      smsNonMarketingConsent: normalizedSmsNonMarketingConsent,
      timestamp,
      sourceUrl: normalizedSourceUrl,
      ipAddress: ip || "unknown",
      userAgent,
      company: company ? String(company) : undefined,
    });

    await sendAllowedSmsMessages({
      phone: normalizedPhone,
      permissions: smsPermissions,
    });

    // Send email to admin
    try {
      await sendAdminNotification({
        resend,
        name: String(name),
        company: company ? String(company) : undefined,
        email: String(email),
        phone: normalizedPhone,
        message: String(message),
        smsMarketingConsent: normalizedSmsMarketingConsent,
        smsNonMarketingConsent: normalizedSmsNonMarketingConsent,
        smsPermissions,
        timestamp,
        sourceUrl: normalizedSourceUrl,
        ip,
        userAgent,
      });
    } catch (adminError) {
      console.error("Error sending admin email:", adminError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { error: userError } = await resend.emails.send({
      from: `Hosvi <${CONTACT_SENDER_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting Hosvi",
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We've received your message and one of our team members will get back to you within 24 hours.</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>If you have any urgent questions, feel free to call us at +1 (754) 310-5950.</p>
        <p>Best regards,<br/>The Hosvi Team</p>
      `,
    });

    if (userError) {
      console.error("Error sending user email:", userError);
      // Don't fail the request if user email fails
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
