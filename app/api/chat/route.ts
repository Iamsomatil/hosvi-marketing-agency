import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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

const buildReply = (message: string) => {
  const text = message.toLowerCase();

  if (text.includes("law firm") || text.includes("paralegal")) {
    return "We help personal injury law firms place clients quickly with vetted clinics. If you share your practice location and typical case volume, we can outline onboarding and turnaround times.";
  }

  if (text.includes("clinic") || text.includes("chiropractor") || text.includes("physical therapy")) {
    return "We partner with treatment providers that accept personal injury cases. Let me know your specialty, location, and capacity, and we can discuss referral volume and onboarding.";
  }

  if (text.includes("coverage") || text.includes("area") || text.includes("location")) {
    return "We coordinate referrals across the Tampa Bay area and can expand based on partner needs. Tell me your primary location and preferred radius.";
  }

  if (text.includes("pricing") || text.includes("cost") || text.includes("fee")) {
    return "Pricing depends on partner type and volume. If you share whether you're a law firm or clinic, I can route you to the right details.";
  }

  if (text.includes("onboard") || text.includes("start") || text.includes("setup")) {
    return "Onboarding is straightforward: we confirm your intake preferences, required documentation, and scheduling workflow. Share your role and location to get started.";
  }

  if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
    return "You can reach us at info@hosvi.com or (754) 207-0982. If you'd like, leave your details here and we'll follow up within 24 hours.";
  }

  return "Thanks for reaching out. We coordinate referrals between personal injury law firms and treatment provider clinics, and do not provide medical or legal advice. How can we help you today?";
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg?.role === "user" && typeof msg.content === "string");

    const reply = buildReply(lastUserMessage?.content?.trim() || "");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
