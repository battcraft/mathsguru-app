import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { loadStats, saveStats } from '../App';
import { TOPICS } from '../data';
import type { UserStats } from '../types';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...filterMotionProps(props)}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

function filterMotionProps(props: Record<string, any>) {
  const filtered: Record<string, any> = {};
  for (const key of Object.keys(props)) {
    if (!['initial', 'animate', 'exit', 'whileHover', 'whileTap', 'transition', 'layout'].includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
}

const STORAGE_KEY = 'mathsguru-stats';

function emptyStats(): UserStats {
  return {
    xp: 0,
    streak: 0,
    screensViewed: new Set(),
    completedScreens: new Set(),
    badges: [],
    quizScores: {},
  };
}

describe('loadStats', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default stats when localStorage is empty', () => {
    const stats = loadStats();
    expect(stats).toEqual(emptyStats());
  });

  it('returns default stats when localStorage contains corrupted JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json!!!');
    const stats = loadStats();
    expect(stats).toEqual(emptyStats());
  });

  it('returns default stats when localStorage contains partial data (no xp)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ streak: 3 }));
    const stats = loadStats();
    expect(stats.xp).toBe(0);
    expect(stats.streak).toBe(3);
  });

  it('restores valid stats with all fields', () => {
    const saved = {
      xp: 150,
      streak: 7,
      screensViewed: ['screen1', 'screen2'],
      completedScreens: ['screen1'],
      badges: ['geometry-guru'],
      quizScores: { 'quiz-1': { score: 4, total: 5 } },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    const stats = loadStats();
    expect(stats.xp).toBe(150);
    expect(stats.streak).toBe(7);
    expect(stats.screensViewed).toEqual(new Set(['screen1', 'screen2']));
    expect(stats.completedScreens).toEqual(new Set(['screen1']));
    expect(stats.badges).toEqual(['geometry-guru']);
    expect(stats.quizScores).toEqual({ 'quiz-1': { score: 4, total: 5 } });
  });

  it('defaults missing arrays to empty', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp: 10 }));
    const stats = loadStats();
    expect(stats.badges).toEqual([]);
    expect(stats.quizScores).toEqual({});
  });

  it('defaults screensViewed and completedScreens to empty sets when null', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp: 5, screensViewed: null, completedScreens: null }));
    const stats = loadStats();
    expect(stats.screensViewed).toEqual(new Set());
    expect(stats.completedScreens).toEqual(new Set());
  });
});

describe('saveStats', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('round-trips stats through save and load', () => {
    const original: UserStats = {
      xp: 42,
      streak: 3,
      screensViewed: new Set(['a', 'b']),
      completedScreens: new Set(['a']),
      badges: ['panga-king'],
      quizScores: { q1: { score: 5, total: 5 } },
    };
    saveStats(original);
    const restored = loadStats();
    expect(restored.xp).toBe(42);
    expect(restored.streak).toBe(3);
    expect(restored.screensViewed).toEqual(new Set(['a', 'b']));
    expect(restored.completedScreens).toEqual(new Set(['a']));
    expect(restored.badges).toEqual(['panga-king']);
    expect(restored.quizScores).toEqual({ q1: { score: 5, total: 5 } });
  });

  it('stores sets as arrays in localStorage', () => {
    const stats: UserStats = {
      ...emptyStats(),
      screensViewed: new Set(['x']),
      completedScreens: new Set(['y']),
    };
    saveStats(stats);
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(Array.isArray(raw.screensViewed)).toBe(true);
    expect(Array.isArray(raw.completedScreens)).toBe(true);
    expect(raw.screensViewed).toEqual(['x']);
    expect(raw.completedScreens).toEqual(['y']);
  });

  it('overwrites previous data on subsequent save', () => {
    saveStats({ ...emptyStats(), xp: 10 });
    saveStats({ ...emptyStats(), xp: 20 });
    const stats = loadStats();
    expect(stats.xp).toBe(20);
  });
});

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the app header', () => {
    render(<App />);
    expect(screen.getByText(/MathsGuru AI/)).toBeInTheDocument();
  });

  it('displays initial XP score', () => {
    render(<App />);
    expect(screen.getByText(/Score: 0 XP/)).toBeInTheDocument();
  });

  it('shows bottom navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Story')).toBeInTheDocument();
  });

  it('starts on Home tab', () => {
    render(<App />);
    expect(screen.getByText(/Namaste/)).toBeInTheDocument();
  });

  it('navigates to Learn tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Learn'));
    expect(screen.getByText(/Padho/)).toBeInTheDocument();
  });

  it('navigates to Quiz tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Quiz'));
    expect(screen.getByText(/Panga Zone/)).toBeInTheDocument();
  });

  it('navigates to Story tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Story'));
    expect(screen.getByText(/Kahani Mode/)).toBeInTheDocument();
  });

  it('navigates back to Home tab', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Learn'));
    expect(screen.getByText(/Padho/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText(/Namaste/)).toBeInTheDocument();
  });

  it('persists stats to localStorage on change', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Learn'));
    const screenBtn = screen.getByText(TOPICS[0].name);
    fireEvent.click(screenBtn);
    const subtopicBtn = screen.getByText(TOPICS[0].subtopics[0].name);
    fireEvent.click(subtopicBtn);
    const doneBtn = screen.getByText('Done!');
    fireEvent.click(doneBtn);
    const saved = JSON.parse(localStorage.getItem('mathsguru-stats')!);
    expect(saved.xp).toBe(5);
  });

  it('loads existing stats from localStorage on mount', () => {
    saveStats({
      xp: 100,
      streak: 5,
      screensViewed: new Set(['s1']),
      completedScreens: new Set(['s1']),
      badges: ['panga-king'],
      quizScores: {},
    });
    render(<App />);
    expect(screen.getByText(/Score: 100 XP/)).toBeInTheDocument();
  });

  it('navigates to Quiz from HomeView start button', () => {
    render(<App />);
    const startBtn = screen.getByText(/Start Practice Drill/);
    fireEvent.click(startBtn);
    expect(screen.getByText(/Panga Zone/)).toBeInTheDocument();
  });
});
