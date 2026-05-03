import { Link } from "@tanstack/react-router";
import logo from "@/assets/ballot-logo.png";

const STEP_LABELS: Record<number, string> = {
  1: "Election Quiz",
  2: "Voting Process",
  3: "Practice Vote",
  4: "Your Certificate",
};

interface Props {
  current: 1 | 2 | 3 | 4;
  /** small right-side text under the score, optional */
  sublabel?: string;
  /** progress 0-1 for the slim bar (e.g. question index / total) */
  progress?: number;
  /** label that floats above the progress thumb, e.g. "Question 1" */
  progressLabel?: string;
  /** big right-side score, e.g. "0/10" */
  score?: string;
  /** label under the score, default "Score" */
  scoreLabel?: string;
}

export function JourneyProgress({
  current,
  sublabel,
  progress,
  progressLabel,
  score,
  scoreLabel = "Score",
}: Props) {
  const pct = Math.max(0, Math.min(1, progress ?? 0)) * 100;

  return (
    <header className="bg-background">
      {/* Top dark navy bar with logo + language */}
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="MyFirstVote logo"
              width={48}
              height={48}
              className="h-9 w-9 flex-shrink-0 object-contain sm:h-12 sm:w-12"
            />
            <div className="min-w-0 leading-tight">
              <div className="font-display text-lg font-extrabold tracking-tight sm:text-2xl">
                <span className="text-white">My</span>
                <span className="text-saffron">FirstVote</span>
              </div>
              <div className="hidden text-xs font-medium text-white/70 sm:block">
                Your Voice, Your Democracy
              </div>
            </div>
          </Link>

          <button
            type="button"
            className="flex flex-shrink-0 items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
          >
            <span aria-hidden>🌐</span>
            <span className="hidden xs:inline sm:inline">English</span>
            <span aria-hidden className="text-xs opacity-70">▾</span>
          </button>
        </div>
      </div>

      {/* Hero band with tricolor wash + step + score + slim progress bar */}
      <div className="relative overflow-hidden border-b border-border bg-cream">
        {/* decorative tricolor wedges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 0% 50%, color-mix(in oklab, var(--saffron) 22%, transparent) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 100% 50%, color-mix(in oklab, var(--india-green) 22%, transparent) 0%, transparent 60%)",
          }}
        />
        {/* Ashoka chakra wisp on left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border-[6px] border-sky/15 sm:block"
        />

        <div className="relative mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
          <div className="flex items-start justify-between gap-3 sm:gap-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white shadow-card sm:h-11 sm:w-11">
                {current === 1 && <QuizIcon />}
                {current === 2 && <ProcessIcon />}
                {current === 3 && <VoteIcon />}
                {current === 4 && <TrophyIcon />}
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-extrabold leading-tight text-navy sm:text-2xl">
                  <span className="sm:hidden">Step {current}/4</span>
                  <span className="hidden sm:inline">Step {current} of 4: {STEP_LABELS[current]}</span>
                </div>
                <div className="text-xs font-medium text-saffron sm:hidden">{STEP_LABELS[current]}</div>
                {sublabel && (
                  <div className="mt-0.5 hidden text-xs font-medium text-muted-foreground sm:block">
                    {sublabel}
                  </div>
                )}
              </div>
            </div>

            {score && (
              <div className="flex-shrink-0 text-right">
                <div className="font-display text-2xl font-extrabold text-saffron sm:text-4xl">
                  {score}
                </div>
                <div className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                  {scoreLabel}
                </div>
              </div>
            )}
          </div>

          {/* Slim progress bar with floating label */}
          {typeof progress === "number" && (
            <div className="relative mt-6 pl-2 pr-2">
              {progressLabel && (
                <div
                  className="absolute -top-3 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-saffron px-2.5 py-0.5 text-[11px] font-bold text-white shadow-glow"
                  style={{ left: `calc(${pct}% )` }}
                >
                  {progressLabel}
                  <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-saffron" />
                </div>
              )}
              <div className="relative h-2.5 w-full overflow-visible rounded-full bg-white shadow-inner ring-1 ring-border">
                <div
                  className="h-full rounded-full bg-saffron-gradient transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-saffron bg-white shadow"
                  style={{ left: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* --- inline icons (kept tiny, themed white) --- */
function QuizIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>
  );
}
function ProcessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>
  );
}
function VoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V6a5 5 0 0 1 10 0v4"/><path d="M9 15h6"/></svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 4H3v3a3 3 0 0 0 3 3M19 4h2v3a3 3 0 0 1-3 3"/></svg>
  );
}
