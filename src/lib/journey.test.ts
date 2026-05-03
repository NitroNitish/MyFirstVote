import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getProgress, setProgress, resetProgress } from './journey';

describe('Journey Progress Library', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('returns empty progress when nothing is stored', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const progress = getProgress();
    expect(progress.quizDone).toBe(false);
    expect(progress.quizScore).toBe(0);
  });

  it('sets and gets progress correctly', () => {
    let store: Record<string, string> = {};
    vi.mocked(localStorage.setItem).mockImplementation((key, value) => {
      store[key] = value;
    });
    vi.mocked(localStorage.getItem).mockImplementation((key) => store[key] || null);

    setProgress({ quizDone: true, quizScore: 80 });
    const progress = getProgress();
    
    expect(progress.quizDone).toBe(true);
    expect(progress.quizScore).toBe(80);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('resets progress', () => {
    resetProgress();
    expect(localStorage.removeItem).toHaveBeenCalledWith('myfirstvote.progress');
  });
});
