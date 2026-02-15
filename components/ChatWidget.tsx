"use client";

import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "hosvi_chat_messages_v1";
const MAX_MESSAGE_LENGTH = 1200;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const defaultMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi! I can help with referral coordination between personal injury law firms and treatment provider clinics. We do not provide medical or legal advice. Ask about coverage areas, onboarding, or next steps.",
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(
            parsed.filter(
              (message) =>
                message &&
                (message.role === "user" || message.role === "assistant") &&
                typeof message.content === "string"
            )
          );
        }
      }
    } catch (error) {
      console.warn("Failed to load chat history", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.warn("Failed to save chat history", error);
    }
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessage: ChatMessage = {
      role: "user",
      content: trimmed.slice(0, MAX_MESSAGE_LENGTH),
    };
    const nextMessages = [...messages, nextMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim();

      if (!reply) {
        throw new Error("Empty response");
      }

      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, I ran into a hiccup. Please try again or leave your contact info to follow up.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-[560px] h-[700px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-white/85 backdrop-blur-xl shadow-2xl border border-slate-200/60 rounded-2xl flex flex-col overflow-hidden relative">
          {/* Chat bubble tail */}
          <div className="absolute bottom-0 right-12 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white/85 transform translate-y-full"></div>
          
          <div className="flex items-center justify-between px-4 py-3 text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-t-2xl">
            <div className="text-sm font-semibold">Ask Hosvi</div>
            <button
              type="button"
              aria-label="Close chat"
              className="text-white/80 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-[80%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white rounded-2xl rounded-br-md after:content-[''] after:absolute after:-right-2 after:bottom-2 after:border-y-[8px] after:border-l-[12px] after:border-y-transparent after:border-l-cyan-500"
                        : "bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-bl-md after:content-[''] after:absolute after:-left-2 after:bottom-2 after:border-y-[8px] after:border-r-[12px] after:border-y-transparent after:border-r-slate-200 before:content-[''] before:absolute before:-left-[11px] before:bottom-[9px] before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="relative max-w-[80%] px-4 py-2.5 text-sm bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-md shadow-sm after:content-[''] after:absolute after:-left-2 after:bottom-2 after:border-y-[8px] after:border-r-[12px] after:border-y-transparent after:border-r-slate-200 before:content-[''] before:absolute before:-left-[11px] before:bottom-[9px] before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-white">
                  Typing…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-3">
            <div className="flex items-end gap-2">
              <textarea
                aria-label="Chat message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                placeholder="Ask about referral coordination, coverage areas, or onboarding"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50"
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setIsOpen((open) => !open)}
        className="mt-3 w-16 h-16 rounded-full text-white shadow-xl flex items-center justify-center text-lg font-semibold transition bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 hover:brightness-110">
        {isOpen ? "−" : "Chat"}
      </button>
    </div>
  );
}
