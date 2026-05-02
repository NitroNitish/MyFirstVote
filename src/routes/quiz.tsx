import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { Confetti } from "@/components/Confetti";
import { QUESTIONS, categoryLabels, shuffle, type Question } from "@/lib/quiz-data";
import { setProgress } from "@/lib/journey";

export const Route = createFileRoute("/quiz")({
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

  return (
    <div className="min-h-screen bg-cream">
      <JourneyProgress current={1} sublabel={`Question ${idx + 1}/${total} · Score ${score}`} />
      {showConfetti && <Confetti />}

      <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Question progress bar */}
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-saffron-gradient transition-all duration-500"
            style={{ width: `${((idx + (picked !== null ? 1 : 0)) / total) * 100}%` }}
          />
        </div>

        <div
          key={q.id}
          className={`animate-scale-in rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 ${
            shake ? "animate-shake" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cat.color}`}>
              <span>{cat.emoji}</span> {cat.label}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Question {idx + 1}
            </span>
          </div>

          <h2 className="mt-5 font-display text-xl font-bold leading-snug text-navy sm:text-2xl">
            {q.question}
          </h2>

          <div className="mt-6 space-y-2.5">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isAns = i === q.correct;
              const showState = picked !== null;
              const cls = !showState
                ? "border-border bg-background hover:border-saffron hover:bg-saffron-light"
                : isAns
                ? "border-india-green bg-india-green-light text-navy"
                : isPicked
                ? "border-destructive bg-destructive/5 text-navy"
                : "border-border bg-background opacity-60";
              return (
                <button
                  key={i}
                  onClick={() => onPick(i)}
                  disabled={picked !== null}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition ${cls}`}
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showState && isAns && <span className="text-india-green">✓</span>}
                  {showState && isPicked && !isAns && <span className="text-destructive">✕</span>}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div
              className={`animate-fade-up mt-6 rounded-xl border-2 p-4 ${
                isCorrect
                  ? "border-india-green bg-india-green-light"
                  : "border-destructive/40 bg-destructive/5"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
                <div>
                  <div className="font-display font-bold text-navy">
                    {isCorrect ? "Correct!" : "Not quite!"}
                  </div>
                  <div className="mt-1 text-sm text-foreground">{q.explanation}</div>
                </div>
              </div>
              <button
                onClick={next}
                className="mt-4 w-full rounded-lg bg-saffron px-6 py-3 font-display font-bold text-white transition hover:opacity-90"
              >
                {isLast ? "See My Score →" : "Next Question →"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
