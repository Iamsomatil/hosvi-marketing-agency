import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
- Share contact info when appropriate: info@hosvi.com or (754) 207-0982
- Offer to collect their information for follow-up

Tone: Professional, friendly, and solution-oriented.`;

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

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Filter history to only include valid pairs (must start with "user")
    // Find the first user message
    const firstUserIndex = geminiMessages.findIndex((m) => m.role === "user");
    const validHistory = firstUserIndex >= 0 ? geminiMessages.slice(0, -1).slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
      systemInstruction: SYSTEM_PROMPT,
    });

    // Send only the last user message
    const lastMessage = geminiMessages[geminiMessages.length - 1];
    const response = await chat.sendMessage(lastMessage.parts[0].text);

    const reply =
      response.response.text() ||
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
