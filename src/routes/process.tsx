import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { setProgress } from "@/lib/journey";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Voting Process Guide · MyFirstVote" },
      { name: "description", content: "Step-by-step timeline, document checklist and dos & don'ts for India's voting day." },
    ],
  }),
  component: ProcessPage,
});

const TIMELINE = [
  {
    when: "Before Election Day",
    icon: "📝",
    title: "Register as Voter",
    bullets: [
      "Visit voters.eci.gov.in",
      "Fill Form 6 (online or offline)",
      "Upload photo + age proof",
      "Deadline: ~30 days before nomination",
    ],
    out: "✅ You'll receive your Voter ID (EPIC)",
  },
  {
    when: "Week Before Election",
    icon: "🔍",
    title: "Find Your Polling Booth",
    bullets: [
      "Check booth at nvsp.in or Voter Helpline app",
      "Note booth number and address",
      "Plan your route and travel time",
    ],
    out: "✅ Download your Voter Slip (Form 17)",
  },
  {
    when: "Night Before",
    icon: "🎒",
    title: "Prepare Your Documents",
    bullets: [
      "Pick ONE valid photo ID (see list below)",
      "Keep original — photocopies not accepted",
      "Charge phone (you'll leave it outside)",
    ],
    out: "✅ All set for tomorrow!",
  },
  {
    when: "Voting Day 🇮🇳",
    icon: "🗳️",
    title: "At the Polling Booth",
    bullets: [
      "Reach booth between 7 AM – 6 PM",
      "Show your ID to the polling officer",
      "Sign the attendance register",
      "Get inked on left index finger",
      "Enter booth, press button, hear beep",
      "Exit. Done in under 10 minutes!",
    ],
    out: "🎉 You voted!",
  },
];

const VALID_IDS = [
  "Voter ID (EPIC)",
  "Aadhaar Card",
  "Passport",
  "Driving License",
  "PAN Card",
  "Bank Passbook (with photo)",
  "Govt. Service ID",
  "Pension document (with photo)",
  "Health insurance smart card",
  "MGNREGA job card",
  "Official ID from PSU",
  "Post office passbook (with photo)",
];

const NOT_ACCEPTED = ["School/College ID", "Photocopies", "Expired documents"];

function ProcessPage() {
  useEffect(() => { setProgress({ processDone: true }); }, []);

  return (
    <div className="min-h-screen bg-cream">
      <JourneyProgress current={2} sublabel="Voting Process" />

      <main className="mx-auto max-w-3xl px-3 py-8 sm:px-4 sm:py-10">
        <header className="text-center">
          <div className="text-5xl">🗳️</div>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-navy sm:text-4xl">
            Here's How to Cast Your First Vote
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Follow these simple steps to vote with confidence.</p>
        </header>

        {/* Timeline */}
        <div className="relative mt-10">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-border sm:left-8" />
          <div className="space-y-5">
            {TIMELINE.map((step, i) => (
              <div key={i} className="relative pl-16 sm:pl-20">
                <div className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-saffron bg-card text-2xl shadow-soft sm:h-16 sm:w-16 sm:text-3xl">
                  {step.icon}
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-semibold uppercase tracking-wider text-saffron">{step.when}</div>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy">{step.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {step.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2"><span className="text-saffron">•</span><span>{b}</span></li>
                    ))}
                  </ul>
                  <div className="mt-3 rounded-lg bg-india-green-light px-3 py-2 text-sm font-medium text-india-green">
                    {step.out}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document checklist */}
        <div className="mt-10 rounded-2xl border-2 border-saffron bg-saffron-light p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-navy">📋 What to Bring on Voting Day</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bring ONE of these 12 valid photo IDs (original):</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {VALID_IDS.map((id) => (
              <li key={id} className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm">
                <span className="text-india-green">✓</span> {id}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
            <div className="text-sm font-semibold text-destructive">❌ Not accepted:</div>
            <div className="mt-1 text-sm text-foreground">{NOT_ACCEPTED.join(" · ")}</div>
          </div>
        </div>

        {/* Dos / Donts / Tips */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-india-green/30 bg-india-green-light p-5">
            <div className="font-display font-bold text-india-green">✅ Do's</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Arrive early</li>
              <li>• Bring original ID</li>
              <li>• Vote independently</li>
              <li>• Ask staff for help</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="font-display font-bold text-destructive">❌ Don'ts</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• No phones inside</li>
              <li>• No photos</li>
              <li>• No party symbols</li>
              <li>• Don't discuss your choice</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-sky/30 bg-sky/5 p-5">
            <div className="font-display font-bold text-sky">💡 Pro Tips</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Beat crowds: 8–9 AM</li>
              <li>• Or 12–3 PM (lunch dip)</li>
              <li>• Carry water</li>
              <li>• Use restroom first</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/ballot"
            className="inline-flex items-center justify-center rounded-xl bg-saffron px-8 py-4 font-display text-lg font-bold text-white shadow-glow transition hover:opacity-95"
          >
            Now Practice Voting →
          </Link>
        </div>
      </main>
    </div>
  );
}
