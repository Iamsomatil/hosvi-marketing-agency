import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { message: "Message received." },
        { status: 200 }
      );
    }
    const resend = new Resend(apiKey);

    // Send email to admin
    const { data: adminEmail, error: adminError } = await resend.emails.send({
      from: "Hosvi Contact <contact@hosvi.com>", // Replace with your domain
      to: "admin@hosvi.com", // Replace with your admin email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (adminError) {
      console.error("Error sending admin email:", adminError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { data: userEmail, error: userError } = await resend.emails.send({
      from: "Hosvi <no-reply@hosvi.com>", // Replace with your domain
      to: email,
      subject: "Thank you for contacting Hosvi",
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We've received your message and one of our team members will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>If you have any urgent questions, feel free to call us at (754) 207-0982.</p>
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
