"use client";

import { useState } from "react";
import { Globe, Send } from "lucide-react";

export default function AskAIPage() {
  const [input, setInput] = useState("");

  return (
    <>
      {/* Scrollable content area — leaves room for fixed input below */}
      <div className="px-5 pt-10 pb-40">
        <div className="container max-w-2xl mx-auto">
          {/* Icon + Title */}
          <div className="text-center mb-8">
            <span className="inline-flex size-16 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 ring-2 ring-gold/40 items-center justify-center mb-4 glow-gold">
              <Globe className="size-7 text-gold" strokeWidth={2} />
            </span>
            <h1 className="font-heading text-3xl font-semibold mb-1">
              Ask Haadiy AI
            </h1>
            <p className="text-sm text-muted-foreground">
              Your personal Silk Road historian
            </p>
          </div>

          {/* Welcome bubble */}
          <div className="rounded-2xl ring-1 ring-cyan/40 bg-cyan/5 p-4 max-w-md">
            <p className="text-sm leading-relaxed text-foreground/90">
              Salom! 👋 I&apos;m Haadiy, your guide to the Silk Road. Ask me
              anything about the history, architecture, or culture of Bukhara,
              Samarkand, and Khiva!
            </p>
          </div>
        </div>
      </div>

      {/* Fixed input bar — above bottom tab on mobile, at bottom on desktop */}
      <div className="fixed left-0 right-0 bottom-[60px] md:bottom-0 z-30 bg-background/85 backdrop-blur-xl border-t border-border/70">
        <div className="container max-w-2xl mx-auto px-5 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO backend
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Silk Road history..."
              className="flex-1 h-12 px-5 rounded-xl ring-1 ring-border bg-card focus:ring-2 focus:ring-cyan/50 outline-none text-sm transition"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="size-12 rounded-xl bg-gold hover:bg-gold-glow text-accent-foreground grid place-items-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send"
            >
              <Send className="size-5" strokeWidth={2.2} />
            </button>
          </form>

          <p className="text-center mt-2 text-[11px] text-muted-foreground">
            ✦ Free tier: 3 questions/day · Unlimited with{" "}
            <a href="/profile" className="text-gold underline">
              Premium
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
