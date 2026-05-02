import { Link } from "@tanstack/react-router";

const STEPS = [
  { n: 1, label: "Quiz", to: "/quiz" as const, emoji: "🎮" },
  { n: 2, label: "Process", to: "/process" as const, emoji: "📋" },
  { n: 3, label: "Vote", to: "/ballot" as const, emoji: "🗳️" },
  { n: 4, label: "Certificate", to: "/certificate" as const, emoji: "🏆" },
];

export function JourneyProgress({ current, sublabel }: { current: 1 | 2 | 3 | 4; sublabel?: string }) {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="font-display text-lg font-bold text-navy">
            🇮🇳 MyFirstVote
          </Link>
          <div className="text-xs font-medium text-muted-foreground">
            Step {current} of 4 {sublabel ? `· ${sublabel}` : ""}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {STEPS.map((s, i) => {
            const done = s.n < current;
            const active = s.n === current;
            return (
              <div key={s.n} className="flex flex-1 items-center gap-1.5">
                <div
                  className={`flex h-7 min-w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    done
                      ? "bg-india-green text-white"
                      : active
                      ? "bg-saffron text-white shadow-glow"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? "✓" : s.n}
                </div>
                <div
                  className={`hidden flex-1 truncate text-xs font-medium sm:block ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 rounded-full ${
                      done ? "bg-india-green" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
