// Edge function: streams chat completions via OpenRouter (Google Gemini 2.0 Flash)
// CORS-enabled, public (no JWT verify).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a friendly election guide for first-time voters in India. Your job:
- Give accurate, simple, encouraging answers about voting in India.
- Cover voter registration (Form 6 at voters.eci.gov.in), the 12 valid photo IDs (Voter ID/EPIC, Aadhaar, Passport, DL, PAN, Bank passbook with photo, Service ID, Pension doc with photo, Health insurance smart card, MGNREGA card, PSU ID, Post office passbook), polling day procedure, EVMs/VVPAT, NOTA, voter rights and common myths.
- Polling hours are 7 AM – 6 PM (varies). Voting age is 18+. Mobile phones are not allowed inside the booth. NRIs can vote in person at their constituency. Aadhaar is NOT mandatory.
- Cite the Election Commission of India (ECI) when relevant.
- Keep answers under 3-4 short sentences. Be warm and encouraging. Use plain English.
- If asked something off-topic, politely steer back to elections and voting.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    if (!OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vote-ready-india.vercel.app", // Optional, for OpenRouter tracking
        "X-Title": "Vote Ready India", // Optional
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
