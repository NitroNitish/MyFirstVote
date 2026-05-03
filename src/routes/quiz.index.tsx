import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { Confetti } from "@/components/Confetti";
import { QUESTIONS, categoryLabels, shuffle, type Question } from "@/lib/quiz-data";
import { setProgress } from "@/lib/journey";
import ballotArt from "@/assets/ballot-logo.png";

export const Route = createFileRoute("/quiz/")({
  head: () => ({
    meta: [
      { title: "Election Quiz · MyFirstVote" },
      { name: "description", content: "10 quick questions to test what you know about voting in India." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>(() => shuffle(QUESTIONS).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const q = questions[idx];
  const total = questions.length;
  const isLast = idx === total - 1;
  const isCorrect = picked !== null && picked === q.correct;
  const cat = categoryLabels[q.category];

  const onPick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2200);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const next = () => {
    if (isLast) {
      const finalScore = score;
      setProgress({ quizDone: true, quizScore: finalScore });
      navigate({ to: "/quiz/result", search: { score: finalScore } });
      return;
    }
    setPicked(null);
    setIdx((n) => n + 1);
  };

  const progress = (idx + (picked !== null ? 1 : 0)) / total;

  return (
    <div className="min-h-screen bg-cream">
      <JourneyProgress
        current={1}
        progress={progress}
        progressLabel={`Question ${idx + 1}`}
        score={`${score}/${total}`}
      />
      {showConfetti && <Confetti />}

      <main className="relative mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-12">
        {/* Decorative dotted clusters */}
        <DotCluster className="absolute left-4 top-16 hidden md:block" />
        <DotCluster className="absolute right-4 top-16 hidden md:block" />
        {/* Faint ballot art bottom-right */}
        <img
          src={ballotArt}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-6 hidden h-48 w-48 opacity-20 md:block"
        />

        <div className="mx-auto max-w-3xl">
          <div
            key={q.id}
            className={`animate-scale-in rounded-2xl border border-border bg-card p-5 shadow-card sm:rounded-3xl sm:p-10 ${
              shake ? "animate-shake" : ""
            }`}
          >
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-sky/10 px-3 py-1 text-xs font-semibold text-sky`}
              >
                <span aria-hidden>{cat.emoji}</span> {cat.label}
              </span>
            </div>

            <h1 className="mt-4 font-display text-xl font-extrabold leading-tight text-navy sm:mt-5 sm:text-4xl">
              {q.question}
            </h1>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isPicked = picked === i;
                const isAns = i === q.correct;
                const showState = picked !== null;
                const cls = !showState
                  ? "border-border bg-background hover:border-saffron hover:bg-saffron-light hover:shadow-card"
                  : isAns
                  ? "border-india-green bg-india-green-light text-navy"
                  : isPicked
                  ? "border-destructive bg-destructive/5 text-navy"
                  : "border-border bg-background opacity-60";
                const badgeCls = !showState
                  ? "bg-sky/10 text-sky"
                  : isAns
                  ? "bg-india-green text-white"
                  : isPicked
                  ? "bg-destructive text-white"
                  : "bg-sky/10 text-sky";
                return (
                  <button
                    key={i}
                    onClick={() => onPick(i)}
                    disabled={picked !== null}
                    className={`group flex w-full items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold text-navy transition sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-base ${cls}`}
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-extrabold transition sm:h-10 sm:w-10 sm:rounded-xl sm:text-base ${badgeCls}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showState && isAns && <span className="text-india-green">✓</span>}
                    {showState && isPicked && !isAns && (
                      <span className="text-destructive">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer helper / feedback */}
            {picked === null ? (
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldIcon />
                <span>Choose the option you think is correct. You'll get instant feedback!</span>
              </div>
            ) : (
              <div
                className={`animate-fade-up mt-8 rounded-2xl border-2 p-5 ${
                  isCorrect
                    ? "border-india-green bg-india-green-light"
                    : "border-destructive/40 bg-destructive/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden>
                    {isCorrect ? "✅" : "❌"}
                  </span>
                  <div>
                    <div className="font-display text-lg font-bold text-navy">
                      {isCorrect ? "Correct!" : "Not quite!"}
                    </div>
                    <div className="mt-1 text-sm text-foreground">{q.explanation}</div>
                  </div>
                </div>
                <button
                  onClick={next}
                  className="mt-5 w-full rounded-xl bg-saffron px-6 py-3.5 font-display text-base font-bold text-white shadow-glow transition hover:opacity-95"
                >
                  {isLast ? "See My Score →" : "Next Question →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        Built with <span className="text-india-green">💚</span> for{" "}
        <span className="font-semibold text-navy">India's Democracy</span>
      </footer>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function DotCluster({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-saffron/30" />
        ))}
      </div>
    </div>
  );
}
