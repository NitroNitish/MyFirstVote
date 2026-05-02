// Tracks linear journey progress in localStorage
const KEY = "myfirstvote.progress";

export interface Progress {
  quizDone: boolean;
  quizScore: number;
  processDone: boolean;
  voteDone: boolean;
  votedFor?: { name: string; party: string; symbol: string };
  startedAt?: number;
}

const empty: Progress = { quizDone: false, quizScore: 0, processDone: false, voteDone: false };

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function setProgress(p: Partial<Progress>) {
  if (typeof window === "undefined") return;
  const next = { ...getProgress(), ...p };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
