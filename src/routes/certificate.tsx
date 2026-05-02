import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { getProgress, resetProgress } from "@/lib/journey";

export const Route = createFileRoute("/certificate")({
  head: () => ({
    meta: [
      { title: "Your Voting Champion Certificate · MyFirstVote" },
      { name: "description", content: "Download and share your personalized voting champion certificate." },
    ],
  }),
  component: CertPage,
});

function CertPage() {
  const [name, setName] = useState("Your Name");
  const [city, setCity] = useState("");
  const [progress, setProg] = useState(() => getProgress());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => { setProg(getProgress()); }, []);

  // Render certificate to canvas whenever inputs change
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = 800, H = 600;
    c.width = W; c.height = H;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#FFF3E0");
    grad.addColorStop(0.5, "#FFFFFF");
    grad.addColorStop(1, "#E8F5E9");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Tricolor top stripe
    ctx.fillStyle = "#FF6B1A"; ctx.fillRect(0, 0, W, 14);
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 14, W, 14);
    ctx.fillStyle = "#2D7D46"; ctx.fillRect(0, 28, W, 14);
    // Bottom stripe
    ctx.fillStyle = "#FF6B1A"; ctx.fillRect(0, H - 42, W, 14);
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, H - 28, W, 14);
    ctx.fillStyle = "#2D7D46"; ctx.fillRect(0, H - 14, W, 14);

    // Inner border
    ctx.strokeStyle = "#0D1B3E";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 70, W - 80, H - 140);

    ctx.textAlign = "center";

    // Title
    ctx.fillStyle = "#0D1B3E";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.fillText("🇮🇳   CERTIFICATE OF ACHIEVEMENT   🇮🇳", W / 2, 110);

    ctx.font = "italic 16px Inter, sans-serif";
    ctx.fillStyle = "#5F5E5A";
    ctx.fillText("This certifies that", W / 2, 160);

    // Name
    ctx.fillStyle = "#FF6B1A";
    ctx.font = "bold 48px Syne, Inter, sans-serif";
    ctx.fillText(name || "Your Name", W / 2, 220);

    // Underline
    const textWidth = ctx.measureText(name || "Your Name").width;
    ctx.strokeStyle = "#FF6B1A";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((W - textWidth) / 2 - 20, 235);
    ctx.lineTo((W + textWidth) / 2 + 20, 235);
    ctx.stroke();

    ctx.fillStyle = "#0D1B3E";
    ctx.font = "bold 22px Syne, Inter, sans-serif";
    ctx.fillText("is a VOTING CHAMPION 🏆", W / 2, 270);

    if (city) {
      ctx.fillStyle = "#5F5E5A";
      ctx.font = "14px Inter, sans-serif";
      ctx.fillText(`from ${city}`, W / 2, 295);
    }

    // Achievements box
    ctx.strokeStyle = "#2D7D46";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(120, 320, W - 240, 130);

    ctx.fillStyle = "#0D1B3E";
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "left";
    const lines = [
      `✅  Completed Election Quiz — Score: ${progress.quizScore}/10 (${Math.round((progress.quizScore / 10) * 100)}%)`,
      `✅  Learned the Voting Process — All steps understood`,
      `✅  Practiced Virtual Ballot — Ready for real voting`,
    ];
    lines.forEach((l, i) => ctx.fillText(l, 145, 350 + i * 30));

    // Quote
    ctx.textAlign = "center";
    ctx.fillStyle = "#2D7D46";
    ctx.font = "italic bold 18px Syne, Inter, sans-serif";
    ctx.fillText("\"Your Vote, Your Voice, Your Democracy\"", W / 2, 490);

    // Footer
    ctx.fillStyle = "#5F5E5A";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🗳️  MyFirstVote.in", 60, H - 60);
    ctx.textAlign = "right";
    const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    ctx.fillText(`Date: ${date}`, W - 60, H - 60);

    setImgUrl(c.toDataURL("image/png"));
  }, [name, city, progress]);

  const download = () => {
    if (!imgUrl) return;
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = `MyFirstVote-Certificate-${(name || "Champion").replace(/\s+/g, "-")}.png`;
    a.click();
  };

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://myfirstvote.in";
  const wa = `https://wa.me/?text=${encodeURIComponent(`I just completed MyFirstVote and I'm voting-ready! 🗳️ Learn to vote in 10 minutes: ${shareUrl}`)}`;
  const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent("Proud to be a Voting Champion! 🏆 Just completed MyFirstVote — learned everything about voting in India. Your turn! 🇮🇳 #FirstTimeVoter")}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen bg-cream pb-12">
      <JourneyProgress current={4} sublabel="You're Ready!" />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="text-center">
          <div className="text-5xl">🏆</div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">You're a Voting Champion!</h1>
          <p className="mt-1 text-sm text-muted-foreground">Personalize, download and share your certificate.</p>
        </header>

        {/* Form */}
        <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2">
          <label className="text-sm">
            <span className="font-semibold text-navy">Your Name</span>
            <input
              value={name === "Your Name" ? "" : name}
              onChange={(e) => setName(e.target.value || "Your Name")}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </label>
          <label className="text-sm">
            <span className="font-semibold text-navy">Your City (optional)</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Mumbai"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </label>
        </div>

        {/* Certificate preview */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-card">
          <canvas ref={canvasRef} className="w-full rounded-lg" />
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Quiz Score" value={`${progress.quizScore}/10`} sub={`${Math.round((progress.quizScore/10)*100)}%`} />
          <Stat label="Steps Completed" value="4/4" sub="All done" />
          <Stat label="Confidence" value="High 🟢" sub="Ready to vote" />
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            onClick={download}
            className="flex items-center justify-center gap-2 rounded-xl bg-saffron px-5 py-3.5 font-display font-bold text-white shadow-glow transition hover:opacity-95"
          >
            📥 Download Certificate
          </button>
          <a href={wa} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-india-green px-5 py-3.5 font-display font-bold text-white transition hover:opacity-90">
            📱 Share on WhatsApp
          </a>
          <a href={tw} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-sky px-5 py-3.5 font-display font-bold text-white transition hover:opacity-90">
            🐦 Share on Twitter
          </a>
          <button
            onClick={() => { navigator.clipboard?.writeText(shareUrl); }}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card px-5 py-3.5 font-display font-bold text-navy transition hover:bg-muted"
          >
            🔗 Copy Link
          </button>
        </div>

        {/* Next steps */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display font-bold text-navy">🎯 What's Next?</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>✓ Register to vote at <a className="text-sky underline" href="https://voters.eci.gov.in" target="_blank" rel="noreferrer">voters.eci.gov.in</a></li>
            <li>✓ Find your polling booth at <a className="text-sky underline" href="https://www.nvsp.in" target="_blank" rel="noreferrer">nvsp.in</a></li>
            <li>✓ Mark election day on your calendar</li>
            <li>✓ Share MyFirstVote with friends — help others learn too!</li>
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="rounded-lg border-2 border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted">
            🏠 Back to Home
          </Link>
          <button
            onClick={() => { resetProgress(); window.location.href = "/quiz"; }}
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            🔄 Start Again
          </button>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-saffron">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
