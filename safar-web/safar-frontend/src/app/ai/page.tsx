"use client";

import { useState } from "react";
import { Globe, Send } from "lucide-react";

export default function AskAIPage() {
  const [input, setInput] = useState("");

  return (
    <div className="px-5 py-10">
      <div className="container max-w-2xl mx-auto">
        {/* Icon + Title */}
        <div className="text-center mb-8">
          <span className="inline-flex size-16 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 ring-2 ring-gold/40 items-center justify-center mb-4 glow-gold">
            <Globe className="size-7 text-gold" strokeWidth={2} />
          </span>
          <h1 className="font-heading text-3xl font-semibold mb-1">
            Ask Safar AI
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal Silk Road historian
          </p>
        </div>

        {/* Welcome bubble */}
        <div className="rounded-2xl ring-1 ring-cyan/40 bg-cyan/5 p-4 mb-4 max-w-md">
          <p className="text-sm leading-relaxed text-foreground/90">
            Salom! 👋 I'm Safar, your guide to the Silk Road. Ask me anything
            about the history, architecture, or culture of Bukhara, Samarkand,
            and Khiva!
          </p>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO backend
          }}
          className="flex items-center gap-2 max-w-xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Silk Road history..."
            className="flex-1 h-12 px-5 rounded-xl ring-1 ring-border bg-card focus:ring-2 focus:ring-cyan/50 outline-none text-sm transition"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="size-12 rounded-xl bg-gold hover:bg-gold-glow text-accent-foreground grid place-items-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <Send className="size-5" strokeWidth={2.2} />
          </button>
        </form>

        {/* Premium teaser */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          ✦ Free tier: 3 questions/day · Unlimited with{" "}
          <a href="/profile" className="text-gold underline">
            Premium
          </a>
        </p>
      </div>
    </div>
  );
}
