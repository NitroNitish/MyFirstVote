import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { Confetti } from "@/components/Confetti";
import { setProgress } from "@/lib/journey";

export const Route = createFileRoute("/ballot")({
  head: () => ({
    meta: [
      { title: "Virtual EVM · MyFirstVote" },
      { name: "description", content: "Practice voting on a realistic Electronic Voting Machine simulator." },
    ],
  }),
  component: BallotPage,
});

interface Candidate {
  number: number;
  name: string;
  party: string;
  symbol: string;
  color: string;
}

const CANDIDATES: Candidate[] = [
  { number: 1, name: "Amit Patel",    party: "Indian National Congress",  symbol: "🔔", color: "#0066CC" },
  { number: 2, name: "Priya Singh",   party: "Bharatiya Janata Party",    symbol: "🌸", color: "#FF6B1A" },
  { number: 3, name: "Rajesh Kumar",  party: "Aam Aadmi Party",           symbol: "✋", color: "#1A5FB4" },
  { number: 4, name: "Meera Sharma",  party: "Bahujan Samaj Party",       symbol: "🐘", color: "#2D7D46" },
  { number: 5, name: "Vikram Das",    party: "Communist Party of India",  symbol: "🌙", color: "#DC143C" },
  { number: 6, name: "NOTA",          party: "None of the Above",         symbol: "❌", color: "#666666" },
];

function beep() {
  if (typeof window === "undefined") return;
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 350);
  } catch { /* ignore */ }
}

type Phase = "ready" | "confirm" | "recording" | "done";

function BallotPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("ready");
  const [selected, setSelected] = useState<Candidate | null>(null);

  const onPress = (c: Candidate) => {
    if (phase !== "ready") return;
    setSelected(c);
    setPhase("confirm");
  };

  const confirm = () => {
    if (!selected) return;
    setPhase("recording");
    beep();
    setTimeout(() => {
      setPhase("done");
      setProgress({
        voteDone: true,
        votedFor: { name: selected.name, party: selected.party, symbol: selected.symbol },
      });
    }, 1800);
  };

  const reset = () => {
    setSelected(null);
    setPhase("ready");
  };

  return (
    <div className="min-h-screen bg-cream pb-12">
      <JourneyProgress current={3} sublabel="Practice Voting" />
      {phase === "done" && <Confetti count={120} />}

      <main className="mx-auto max-w-2xl px-4 py-8">
        <header className="text-center">
          <h1 className="font-display text-3xl font-extrabold text-navy">Practice Your Vote on a Real EVM</h1>
          <p className="mt-2 text-sm text-muted-foreground">This is exactly how the voting machine looks. Try it!</p>
        </header>

        {/* EVM */}
        <div className="mt-8 overflow-hidden rounded-2xl border-4 border-navy bg-navy text-white shadow-card">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-white/20 bg-navy px-4 py-3">
            <div className="font-display text-sm font-bold tracking-wider">ELECTRONIC VOTING MACHINE</div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  phase === "recording" ? "bg-destructive animate-led" : phase === "done" ? "bg-india-green" : "bg-white/40"
                }`}
              />
              <span className="font-mono">
                {phase === "recording" ? "RECORDING…" : phase === "done" ? "DONE" : "READY"}
              </span>
            </div>
          </div>

          {/* Ballot */}
          <div className="bg-cream p-3 sm:p-4">
            <div className="rounded-lg bg-card">
              {CANDIDATES.map((c, i) => {
                const isPicked = selected?.number === c.number;
                const dim = phase === "confirm" && !isPicked;
                return (
                  <div
                    key={c.number}
                    className={`flex items-center gap-3 border-b border-border p-3 transition last:border-b-0 sm:p-4 ${
                      dim ? "opacity-30" : ""
                    } ${isPicked && phase === "recording" ? "bg-destructive/10" : ""} ${
                      isPicked && phase === "done" ? "bg-india-green-light" : ""
                    }`}
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                      {c.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-bold text-navy sm:text-base truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.party}</div>
                    </div>
                    <div
                      className="hidden h-10 w-10 items-center justify-center rounded-md text-2xl text-white sm:flex"
                      style={{ background: c.color }}
                    >
                      {c.symbol}
                    </div>
                    <button
                      onClick={() => onPress(c)}
                      disabled={phase !== "ready"}
                      className={`flex h-10 items-center gap-2 rounded-md border-2 px-3 font-mono text-xs font-bold transition ${
                        phase === "ready"
                          ? "border-saffron bg-saffron-light text-navy hover:bg-saffron hover:text-white active:scale-95"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className={`inline-block h-2 w-2 rounded-full ${isPicked && phase === "recording" ? "bg-destructive animate-led" : "bg-destructive/50"}`} />
                      PRESS
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Confirm modal */}
        {phase === "confirm" && selected && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="animate-scale-in w-full max-w-sm rounded-2xl bg-card p-6 shadow-card">
              <div className="text-center">
                <div className="text-4xl">{selected.symbol}</div>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">Confirm your vote</h3>
                <div className="mt-2 text-sm text-muted-foreground">You selected</div>
                <div className="mt-1 font-display text-xl font-bold text-saffron">{selected.name}</div>
                <div className="text-xs text-muted-foreground">{selected.party}</div>
                <div className="mt-4 rounded-lg bg-saffron-light p-2 text-xs text-foreground">
                  ⚠️ In real voting, this is final. Choose carefully.
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button onClick={reset} className="rounded-lg border-2 border-border bg-background py-2.5 text-sm font-semibold hover:bg-muted">
                  Cancel
                </button>
                <button onClick={confirm} className="rounded-lg bg-india-green py-2.5 text-sm font-bold text-white hover:opacity-90">
                  Confirm Vote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Done state */}
        {phase === "done" && selected && (
          <div className="animate-fade-up mt-6 rounded-2xl border-2 border-india-green bg-india-green-light p-6 text-center shadow-card">
            <div className="text-4xl">✅</div>
            <h2 className="mt-2 font-display text-2xl font-bold text-india-green">VOTE RECORDED!</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your practice vote went to:</p>
            <div className="mt-2 font-display text-xl font-bold text-navy">
              {selected.symbol} {selected.name}
            </div>
            <div className="text-xs text-muted-foreground">{selected.party}</div>
            <p className="mt-4 text-sm text-foreground">That's how simple real voting is. You're ready! 🎉</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button onClick={reset} className="rounded-lg border-2 border-border bg-card py-3 font-semibold text-navy hover:bg-muted">
                Try Again
              </button>
              <button
                onClick={() => navigate({ to: "/certificate" })}
                className="rounded-lg bg-saffron py-3 font-display font-bold text-white shadow-glow hover:opacity-95"
              >
                Get My Certificate →
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-india-green/30 bg-india-green-light p-3 text-xs">
            <b className="text-india-green">In real voting</b> — once you press, it's final. Choose carefully.
          </div>
          <div className="rounded-xl border border-sky/30 bg-sky/5 p-3 text-xs">
            <b className="text-sky">NOTA</b> — pick it if you don't support any candidate.
          </div>
          <div className="rounded-xl border border-saffron/30 bg-saffron-light p-3 text-xs">
            <b className="text-saffron">Ink mark</b> — proves you voted, lasts 2-3 days.
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/process" className="text-xs text-muted-foreground hover:underline">
            ← Back to process guide
          </Link>
        </div>
      </main>
    </div>
  );
}
