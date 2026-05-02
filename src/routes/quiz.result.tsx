import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { JourneyProgress } from "@/components/JourneyProgress";

const search = z.object({ score: z.number().min(0).max(10).catch(0) });

export const Route = createFileRoute("/quiz/result")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Your Quiz Score · MyFirstVote" }] }),
  component: ResultPage,
});

function ResultPage() {
  const { score } = Route.useSearch();
  const pct = Math.round((score / 10) * 100);
  const tier =
    score >= 8 ? { emoji: "🏆", label: "Champion!", color: "text-india-green" } :
    score >= 5 ? { emoji: "👏", label: "Great start!", color: "text-saffron" } :
                 { emoji: "💪", label: "Keep learning!", color: "text-sky" };

  return (
    <div className="min-h-screen bg-cream">
      <JourneyProgress current={1} sublabel="Quiz complete" />
      <main className="mx-auto max-w-xl px-4 py-12 text-center">
        <div className="animate-scale-in rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-6xl">{tier.emoji}</div>
          <h1 className={`mt-3 font-display text-3xl font-extrabold ${tier.color}`}>{tier.label}</h1>
          <div className="mt-6 font-display text-6xl font-extrabold text-navy">
            {score}<span className="text-3xl text-muted-foreground">/10</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{pct}% correct</div>

          <div className="mx-auto mt-6 h-3 max-w-xs overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-saffron-gradient transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Now let's learn the actual voting process — documents, timeline and what to expect at the booth.
          </p>

          <Link
            to="/process"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-saffron px-6 py-4 font-display text-lg font-bold text-white shadow-glow transition hover:opacity-95"
          >
            Learn the Voting Process →
          </Link>
        </div>
      </main>
    </div>
  );
}
