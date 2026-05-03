import { useState, useRef, useEffect } from "react";
import { chatAction } from "../lib/chat-action";

interface Msg { role: "user" | "assistant"; content: string; }

const QUICK = [
  "How do I register?",
  "What documents do I need?",
  "Where is my polling booth?",
  "Can NRIs vote?",
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your election guide 🗳️\n\nAsk me anything about voting in India — registration, documents, EVMs, your rights." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Calling server function
      const res = await chatAction(next.map((m) => ({ role: m.role, content: m.content })));

      if (!res.ok || !res.body) {
        if (res.status === 401) throw new Error("Invalid API Key.");
        if (res.status === 429) throw new Error("Too many requests.");
        throw new Error("Chat error.");
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        const chunk = decoder.decode(value, { stream: true });
        
        // OpenRouter sends data: {...}
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch (e) {
            // Ignore partial JSON
          }
        }
      }
    } catch (e: any) {
      console.error('Chat error:', e);
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${e?.message ?? "Something went wrong."}` }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open election assistant"
        className="animate-pulse-ring fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-saffron px-5 font-display text-sm font-bold text-white shadow-glow transition hover:scale-105"
      >
        <span className="text-xl">💬</span> Ask AI
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-card sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[80vh] sm:w-96 sm:rounded-2xl sm:border sm:border-border sm:shadow-card">
      <div className="flex items-center justify-between rounded-t-none bg-navy px-4 py-3 text-white sm:rounded-t-2xl">
        <div>
          <div className="font-display font-bold">💬 Election Assistant</div>
          <div className="text-xs opacity-70">Ask anything about voting</div>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md px-2 py-1 text-xl hover:bg-white/10">×</button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-cream p-4">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-saffron text-white"
                    : "rounded-bl-sm border border-border bg-card text-foreground"
                }`}
              >
                {m.content || (loading && i === messages.length - 1 ? "…" : "")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex gap-2 border-t border-border bg-card p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-saffron px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
