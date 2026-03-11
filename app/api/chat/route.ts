import OpenAI from "openai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

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

const SYSTEM_PROMPT = `You are Hosvi, a friendly and professional support agent for Hosvi - a referral coordination platform connecting personal injury law firms with treatment provider clinics.

About Hosvi:
- We coordinate referrals between personal injury law firms and treatment provider clinics
- We operate primarily in the Tampa Bay area and can expand based on partner needs
- We help law firms place clients quickly with vetted clinics
- We help treatment providers (clinics, chiropractors, physical therapists) access a network of law firm referrals
- We handle intake, documentation, and scheduling workflows

Key points:
- You do NOT provide medical or legal advice
- Be concise and helpful
- Ask clarifying questions if the user's role (law firm vs clinic) is unclear
- If the user asks to speak to a person, requests human support, needs follow-up, or seems frustrated, direct them to contact@hosvi.com
- When handing off to a human, explicitly tell them: "Please email contact@hosvi.com and our team will help you."
- Share contact info when appropriate, prioritizing contact@hosvi.com and +1 (754) 310-5950
- Offer to collect their information for follow-up

Tone: Professional, friendly, and solution-oriented.`;

export async function POST(request: Request) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: "Chat service is not configured" },
        { status: 500 }
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "developer", content: SYSTEM_PROMPT },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      response.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
