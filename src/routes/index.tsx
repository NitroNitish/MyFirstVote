import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/ballot-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyFirstVote — From Confused to Confident in 10 Minutes" },
      {
        name: "description",
        content:
          "Interactive 4-step journey teaching India's first-time voters everything about elections.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    n: 1,
    icon: "🎮",
    title: "Play Quiz",
    desc: "Test your voting knowledge",
    bg: "bg-[oklch(0.45_0.18_295)]",
    badge: "bg-[oklch(0.55_0.20_295)]",
  },
  {
    n: 2,
    icon: "📋",
    title: "Learn Process",
    desc: "Know every step with documents",
    bg: "bg-saffron",
    badge: "bg-saffron",
  },
  {
    n: 3,
    icon: "🗳️",
    title: "Practice Vote",
    desc: "Try real EVM simulator",
    bg: "bg-india-green",
    badge: "bg-india-green",
  },
  {
    n: 4,
    icon: "🏆",
    title: "Get Certificate",
    desc: "Become a voting champion",
    bg: "bg-[oklch(0.65_0.15_75)]",
    badge: "bg-[oklch(0.65_0.15_75)]",
  },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "Learn Through Fun",
    text: "10 interactive questions teaching election basics in a fun way",
    pill: "🎮 Quiz Game",
    accent: "india-green",
    iconBg: "bg-india-green-light text-india-green",
    pillCls: "bg-india-green-light text-india-green",
    border: "border-l-india-green",
  },
  {
    icon: "📋",
    title: "Know The Process",
    text: "Step-by-step guide with all required documents and important tips",
    pill: "📄 Complete Guide",
    accent: "saffron",
    iconBg: "bg-saffron-light text-saffron",
    pillCls: "bg-saffron-light text-saffron",
    border: "border-l-saffron",
  },
  {
    icon: "🗳️",
    title: "Practice Voting",
    text: "Realistic ballot simulation to experience voting before the real thing",
    pill: "🖥️ EVM Simulator",
    accent: "sky",
    iconBg: "bg-[oklch(0.95_0.04_255)] text-sky",
    pillCls: "bg-[oklch(0.95_0.04_255)] text-sky",
    border: "border-l-sky",
  },
];

const HOW = [
  { n: 1, icon: "📖", title: "Learn", desc: "Answer 10 questions and build your voting knowledge", color: "india-green", bg: "bg-india-green-light", num: "bg-india-green" },
  { n: 2, icon: "📄", title: "Understand", desc: "Learn the complete voting process and required documents", color: "saffron", bg: "bg-saffron-light", num: "bg-saffron" },
  { n: 3, icon: "👆", title: "Practice", desc: "Experience real EVM and practice your vote confidently", color: "sky", bg: "bg-[oklch(0.95_0.04_255)]", num: "bg-sky" },
  { n: 4, icon: "🏆", title: "Achieve", desc: "Get your certificate and become a voting champion!", color: "purple", bg: "bg-[oklch(0.95_0.05_295)]", num: "bg-[oklch(0.55_0.20_295)]" },
];

const STATS = [
  { icon: "👥", v: "50,000+", l: "Voters Trained", color: "text-india-green" },
  { icon: "⭐", v: "4.9/5", l: "User Rating", color: "text-saffron" },
  { icon: "✅", v: "100%", l: "Free Forever", color: "text-sky" },
  { icon: "💜", v: "Made with ❤", l: "for Democracy", color: "text-[oklch(0.65_0.18_295)]" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top navy nav */}
      <nav className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src={logo} alt="MyFirstVote logo" className="h-9 w-9 flex-shrink-0 object-contain sm:h-12 sm:w-12" />
            <div className="min-w-0 leading-tight">
              <div className="font-display text-lg font-extrabold tracking-tight sm:text-2xl">
                <span className="text-white">My</span>
                <span className="text-saffron">First</span>
                <span className="text-india-green">Vote</span>
              </div>
              <div className="text-[10px] font-medium text-white/70 sm:text-xs">Your Voice, Your Democracy</div>
            </div>
          </Link>
          <button className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10 sm:text-sm">
            <span aria-hidden>🌐</span>
            <span>English</span>
            <span className="opacity-70">▾</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        {/* decorative ashoka chakra left */}
        <div aria-hidden className="pointer-events-none absolute -left-16 top-20 hidden h-56 w-56 rounded-full border-[10px] border-sky/25 sm:block" />
        <div aria-hidden className="pointer-events-none absolute -left-10 top-28 hidden h-32 w-32 rounded-full border-4 border-sky/20 sm:block" />
        {/* parliament wisp right */}
        <div aria-hidden className="pointer-events-none absolute right-6 top-16 hidden text-5xl opacity-30 sm:block">🏛️</div>
        <div aria-hidden className="pointer-events-none absolute right-20 top-10 hidden text-3xl sm:block">🇮🇳</div>
        {/* birds */}
        <div aria-hidden className="pointer-events-none absolute left-24 top-44 hidden text-xs opacity-60 sm:block">𓅯 𓅯 𓅯</div>
        {/* sun glow corner */}
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--saffron) 50%, transparent), transparent 70%)" }} />

        <div className="relative mx-auto max-w-5xl px-4 pb-32 pt-10 text-center sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-navy shadow-card sm:text-xs">
            🇮🇳 <span className="text-saffron">Your Complete Voting Guide</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">
            From Confused to <br className="hidden sm:block" />
            Confident in Just <br />
            <span className="bg-gradient-to-r from-saffron to-india-green bg-clip-text text-transparent">10 Minutes</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            Interactive learning for India's first-time voters
          </p>

          {/* 4 step icons row */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 items-start gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-x-0">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center">
                <div className="relative">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${s.bg} text-3xl shadow-card sm:h-20 sm:w-20`}>
                    {s.icon}
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full ${s.badge} text-xs font-bold text-white ring-2 ring-navy`}>
                    {s.n}
                  </div>
                </div>
                <div className="mt-4 font-display text-sm font-bold sm:text-base">{s.title}</div>
                <div className="mt-1 max-w-[10rem] text-[11px] leading-snug text-white/70 sm:text-xs">{s.desc}</div>
                {i < STEPS.length - 1 && (
                  <div aria-hidden className="absolute right-0 top-8 hidden translate-x-1/2 text-white/40 sm:block">
                    ╴╴→
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            to="/quiz"
            className="mt-12 inline-flex items-center justify-center gap-3 rounded-full bg-saffron px-10 py-4 font-display text-lg font-bold text-white shadow-glow transition hover:scale-105 sm:text-xl"
          >
            Start Your Journey <span className="text-2xl">→</span>
          </Link>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">🛡️ 100% Free</span>
            <span className="inline-flex items-center gap-1.5">👤 No Signup</span>
            <span className="inline-flex items-center gap-1.5">📡 Works Offline</span>
          </div>
        </div>

        {/* tricolor wave at bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28" style={{
          background:
            "linear-gradient(180deg, transparent, transparent), radial-gradient(120% 100% at 0% 100%, var(--saffron) 20%, transparent 22%), radial-gradient(120% 100% at 0% 100%, white 32%, transparent 34%), radial-gradient(120% 100% at 0% 100%, var(--india-green) 44%, transparent 46%), radial-gradient(120% 100% at 100% 100%, var(--saffron) 20%, transparent 22%), radial-gradient(120% 100% at 100% 100%, white 32%, transparent 34%), radial-gradient(120% 100% at 100% 100%, var(--india-green) 44%, transparent 46%)",
        }} />
      </section>

      {/* Why section */}
      <section className="bg-beige/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-saffron">
            <span className="h-px w-8 bg-saffron" />
            Why Learn with MyFirstVote?
            <span className="h-px w-8 bg-saffron" />
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-navy sm:text-4xl">
            Everything You Need to Vote with Confidence
          </h2>
          <div className="mx-auto mt-3 flex w-24 gap-1">
            <span className="h-1 flex-1 rounded bg-saffron" />
            <span className="h-1 flex-1 rounded bg-india-green" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className={`rounded-2xl border-l-4 ${f.border} bg-card p-6 text-left shadow-card transition hover:-translate-y-1`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBg} text-2xl`}>
                  {f.icon}
                </div>
                <h3 className="mt-5 text-center font-display text-xl font-bold text-navy">{f.title}</h3>
                <div className={`mx-auto mt-2 h-0.5 w-10 bg-${f.accent}`} />
                <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                <div className="mt-5 flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 rounded-full ${f.pillCls} px-4 py-1.5 text-xs font-semibold`}>
                    {f.pill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-beige/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">HOW IT WORKS</h2>
          <div className="mx-auto mt-3 flex w-24 gap-1">
            <span className="h-1 flex-1 rounded bg-saffron" />
            <span className="h-1 flex-1 rounded bg-india-green" />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {HOW.map((h, i) => (
              <div key={h.n} className="relative flex flex-col items-center px-2">
                <div className="relative">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full ${h.bg} text-3xl ring-4 ring-white shadow-card`}>
                    {h.icon}
                  </div>
                  <div className={`absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${h.num} text-xs font-bold text-white ring-2 ring-white`}>
                    {h.n}
                  </div>
                </div>
                <div className="mt-4 font-display text-base font-bold text-navy">{h.title}</div>
                <div className="mt-2 max-w-[11rem] text-xs leading-snug text-muted-foreground">{h.desc}</div>
                {i < HOW.length - 1 && (
                  <div aria-hidden className="absolute right-0 top-8 hidden translate-x-1/2 text-saffron/50 sm:block">╴╴→</div>
                )}
              </div>
            ))}
          </div>

          {/* Trust card */}
          <div className="relative mx-auto mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white shadow-card sm:px-10">
            <div aria-hidden className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 text-5xl opacity-20 sm:block">☝️</div>
            <div aria-hidden className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-4xl opacity-20 sm:block">👥👥</div>

            <div className="flex items-center justify-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">🛡️</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold sm:text-xl">Trusted by Thousands of First-Time Voters</h3>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.l} className="flex flex-col items-center">
                  <div className={`text-xl ${s.color}`}>{s.icon}</div>
                  <div className={`mt-1 font-display text-lg font-extrabold ${s.color} sm:text-xl`}>{s.v}</div>
                  <div className="text-[11px] text-white/70 sm:text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tricolor band */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(90deg, var(--saffron-light), white, var(--india-green-light))" }}>
        <div aria-hidden className="pointer-events-none absolute left-2 bottom-0 hidden text-6xl sm:block">🧑‍🤝‍🧑</div>
        <div aria-hidden className="pointer-events-none absolute right-4 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border-[10px] border-sky/30 sm:block" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-4xl">
            <span className="text-saffron">Your</span> <span className="text-navy">Vote.</span>{" "}
            <span className="text-saffron">Your</span> <span className="text-navy">Voice.</span>{" "}
            <br className="sm:hidden" />
            <span className="text-saffron">Your</span> <span className="text-india-green underline decoration-india-green/30 underline-offset-4">Democracy</span>
            <span className="text-navy">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-navy/70 sm:text-base">
            Every vote counts. Every voice matters. <br />
            Be the change. Vote for a better India.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-6 sm:grid-cols-3 sm:py-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-sm font-extrabold">
                My<span className="text-saffron">First</span><span className="text-india-green">Vote</span>.in
              </div>
              <div className="text-[10px] text-white/70">Your Voice, Your Democracy</div>
            </div>
          </div>
          <div className="text-center text-xs text-white/80">
            Built with <span className="text-india-green">💚</span> for India's Democracy 🇮🇳
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="text-right text-[11px] text-white/70 hidden sm:block">
              Share with friends and<br />help them become voting-ready!
            </div>
            <div className="flex gap-1.5">
              {["💬","🐦","📷","🔗"].map((e) => (
                <span key={e} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">{e}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-3 text-center text-[11px] text-white/50">
          © 2025 MyFirstVote.in | All rights reserved | An initiative for informed and empowered voters
        </div>
      </footer>
    </div>
  );
}
