"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "hosvi_chat_messages_v2";
const MAX_MESSAGE_LENGTH = 1200;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const EMAIL_REGEX = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

const defaultMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi, How can we help you?",
  },
];

const renderMessageContent = (content: string) => {
  const parts = content.split(EMAIL_REGEX);

  return parts.map((part, index) => {
    if (part.match(EMAIL_REGEX)) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${part}`}
          className="font-medium underline underline-offset-2"
        >
          {part}
        </a>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const applyMatch = () => setIsDesktop(mediaQuery.matches);

    applyMatch();
    mediaQuery.addEventListener("change", applyMatch);

    return () => mediaQuery.removeEventListener("change", applyMatch);
  }, []);

  const panelStyle: React.CSSProperties = isDesktop
    ? {
        position: "fixed",
        top: 96,
        right: 24,
        bottom: 100,
        width: "min(420px, calc(100vw - 32px))",
        zIndex: 2147483647,
      }
    : {
        position: "fixed",
        top: 88,
        right: 12,
        left: 12,
        bottom: 84,
        width: "auto",
        zIndex: 2147483647,
      };

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
            "Sorry, I ran into a hiccup. Please try again, email contact@hosvi.com, or call +1 (754) 310-5950 if you need a person to help.",
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

  const chatPanel =
    isMounted && isOpen
      ? createPortal(
          <div
            className="relative"
            style={panelStyle}
          >
            <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex min-h-14 flex-none items-center justify-between bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 px-4 py-4 text-white">
                <div className="text-sm font-semibold leading-5">Ask Hosvi</div>
                <button
                  type="button"
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold leading-none text-white/90 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  X
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 space-y-3">
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
                            ? "bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 text-white rounded-2xl rounded-br-md after:content-[''] after:absolute after:-right-2 after:bottom-2 after:border-y-[8px] after:border-l-[12px] after:border-y-transparent after:border-l-cyan-600"
                            : "bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-bl-md after:content-[''] after:absolute after:-left-2 after:bottom-2 after:border-y-[8px] after:border-r-[12px] after:border-y-transparent after:border-r-slate-200 before:content-[''] before:absolute before:-left-[11px] before:bottom-[9px] before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-white"
                        }`}
                      >
                        {renderMessageContent(message.content)}
                      </div>
                    </div>
                  );
                })}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="relative max-w-[80%] px-4 py-2.5 text-sm bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-md shadow-sm after:content-[''] after:absolute after:-left-2 after:bottom-2 after:border-y-[8px] after:border-r-[12px] after:border-y-transparent after:border-r-slate-200 before:content-[''] before:absolute before:-left-[11px] before:bottom-[9px] before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-white">
                      Typing...
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <form onSubmit={handleSubmit} className="flex-none border-t border-slate-200 p-3">
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
                    className="bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-cyan-700 transition disabled:opacity-50"
                    disabled={isLoading || !input.trim()}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-12 h-0 w-0 translate-y-full border-l-[24px] border-r-[24px] border-t-[24px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {chatPanel}
      <div className="fixed bottom-3 right-3 z-[2147483646] sm:bottom-6 sm:right-6">
      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setIsOpen((open) => !open)}
        className="w-16 h-16 rounded-full text-white shadow-xl flex items-center justify-center text-lg font-semibold transition bg-cyan-600 hover:bg-cyan-700">
        {isOpen ? "−" : "Chat"}
      </button>
      </div>
    </>
  );
}
