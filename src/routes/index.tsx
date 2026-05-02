import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyFirstVote — From Confused to Confident in 10 Minutes" },
      { name: "description", content: "Interactive 4-step journey teaching India's first-time voters everything about elections." },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { n: 1, emoji: "🎮", title: "Play Quiz", desc: "10 fun questions" },
  { n: 2, emoji: "📋", title: "Learn Process", desc: "Step-by-step" },
  { n: 3, emoji: "🗳️", title: "Practice Vote", desc: "Real EVM" },
  { n: 4, emoji: "🏆", title: "Get Certificate", desc: "Share & flex" },
];

const FEATURES = [
  { emoji: "🎯", title: "Learn Through Fun", text: "10 interactive questions teaching election basics, documents, and rules." },
  { emoji: "📋", title: "Know The Process", text: "Step-by-step guide with all 12 valid documents and dos & don'ts." },
  { emoji: "🗳️", title: "Practice Voting", text: "A realistic EVM simulator so you walk in confident on election day." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-display text-lg font-bold">🇮🇳 MyFirstVote</div>
          <div className="text-xs opacity-80">For India's first-time voters</div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, var(--saffron) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--india-green) 0%, transparent 40%)",
        }} />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
            🇮🇳 Your Complete Voting Guide
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            From Confused to Confident in Just 10 Minutes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Interactive learning for India's first-time voters
          </p>

          {/* Step preview */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.n} className="animate-fade-up rounded-xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-70">Step {s.n}</div>
                <div className="font-display text-sm font-bold">{s.title}</div>
                <div className="text-xs opacity-70">{s.desc}</div>
              </div>
            ))}
          </div>

          <Link
            to="/quiz"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-saffron px-8 py-4 font-display text-lg font-bold text-white shadow-glow transition hover:scale-105 hover:opacity-95"
          >
            Start Your Journey →
          </Link>
          <div className="mt-4 text-xs text-white/60">Free · No signup · 10 minutes</div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">Why MyFirstVote?</h2>
          <p className="mt-2 text-muted-foreground">Everything you need before pressing that EVM button.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-soft transition hover:shadow-card">
              <div className="text-4xl">{f.emoji}</div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-cream py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 text-center sm:grid-cols-4">
          {[
            { v: "18+", l: "Voting age" },
            { v: "12", l: "Valid IDs" },
            { v: "7-6", l: "Polling hours" },
            { v: "10 min", l: "To learn it all" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl font-bold text-saffron">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-navy">Ready to make your first vote count?</h2>
        <Link
          to="/quiz"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-saffron px-8 py-4 font-display text-lg font-bold text-white shadow-glow transition hover:scale-105"
        >
          Start the Quiz →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-navy py-8 text-center text-sm text-white/70">
        Built with 💚 for India's Democracy
      </footer>
    </div>
  );
}
