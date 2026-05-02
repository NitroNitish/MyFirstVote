import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "assistant"; content: string; }

const QUICK = [
  "How do I register?",
  "What documents do I need?",
  "Where is my polling booth?",
  "Can NRIs vote?",
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

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

    if (!SUPABASE_URL) {
      setMessages([...next, { role: "assistant", content: "Chat is unavailable right now." }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY ?? ""}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        if (res.status === 429) throw new Error("Too many requests — try again in a minute.");
        if (res.status === 402) throw new Error("AI credits exhausted.");
        throw new Error("Chat error.");
      }

      // append empty assistant msg to fill via streaming
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistantText = "";
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
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
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e: any) {
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
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-none bg-navy px-4 py-3 text-white sm:rounded-t-2xl">
        <div>
          <div className="font-display font-bold">💬 Election Assistant</div>
          <div className="text-xs opacity-70">Ask anything about voting</div>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md px-2 py-1 text-xl hover:bg-white/10">×</button>
      </div>

      {/* Messages */}
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
          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-saffron" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-saffron" style={{ animationDelay: "0.15s" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-saffron" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <div className="border-t border-border bg-card px-3 py-2">
          <div className="mb-1 text-xs font-semibold text-muted-foreground">Try:</div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-saffron-light px-3 py-1 text-xs font-medium text-navy hover:bg-saffron hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
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
