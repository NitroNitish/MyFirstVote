import { createServerFn } from '@tanstack/react-start'

// Using the simplest positional arguments API for createServerFn
export const chatAction = createServerFn('POST', async (messages: { role: string; content: string }[]) => {
  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  
  if (!OPENROUTER_KEY) {
    console.error('OPENROUTER_API_KEY is not set in environment variables');
    throw new Error('Chat is currently unavailable. Please try again later.');
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "HTTP-Referer": "https://myfirstvote.in",
        "X-Title": "Vote Ready India",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { 
            role: "system", 
            content: "You are a friendly election guide for first-time voters in India. Give accurate, simple, encouraging answers about voting in India. Cite ECI when relevant. Keep answers under 3-4 short sentences." 
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', response.status, errorText);
      throw new Error(`Chat error: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    console.error('Server function error:', error);
    throw error;
  }
})
