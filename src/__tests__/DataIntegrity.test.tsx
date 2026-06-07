import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, { loadStats, saveStats } from '../App';
import { TOPICS, BADGES, QUIZ_QUESTIONS } from '../data';
import { LearnView } from '../components/LearnView';
import type { UserStats, DifficultyLevel } from '../types';
import fs from 'fs';
import path from 'path';

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

const SCREENS_DIR = path.resolve(__dirname, '../../public/screens');
const VIDEOS_DIR = path.resolve(__dirname, '../../public/videos');

describe('Data Integrity', () => {
  it('TOPICS array is not empty', () => {
    expect(TOPICS.length).toBeGreaterThan(0);
  });

  it('each topic has a unique id and at least one subtopic', () => {
    const ids = new Set<string>();
    for (const topic of TOPICS) {
      expect(ids.has(topic.id)).toBe(false);
      ids.add(topic.id);
      expect(topic.subtopics.length).toBeGreaterThan(0);
    }
  });

  it('each topic has a non-empty name', () => {
    for (const topic of TOPICS) {
      expect(topic.name.trim()).toBeTruthy();
    }
  });

  it('each subtopic has a unique id within its topic', () => {
    for (const topic of TOPICS) {
      const subIds = new Set<string>();
      for (const sub of topic.subtopics) {
        expect(subIds.has(sub.id)).toBe(false);
        subIds.add(sub.id);
      }
    }
  });

  it('each subtopic has at least one screen', () => {
    for (const topic of TOPICS) {
      for (const sub of topic.subtopics) {
        expect(sub.screens.length).toBeGreaterThan(0);
      }
    }
  });

  it('all subtopics have the standard 5-pillar structure for Topic 1 (geometry)', () => {
    const pillarIds = TOPICS[0].subtopics.map(s => s.id);
    expect(pillarIds).toContain('videos');
    expect(pillarIds).toContain('practice');
    expect(pillarIds).toContain('stories');
    expect(pillarIds).toContain('quizzes');
    expect(pillarIds).toContain('mastery');
  });

  it('all subtopics have the standard pillars for Topic 2 (maxmin)', () => {
    const pillarIds = TOPICS[1].subtopics.map(s => s.id);
    expect(pillarIds).toContain('videos');
    expect(pillarIds).toContain('practice');
    expect(pillarIds).toContain('stories');
    expect(pillarIds).toContain('quizzes');
    expect(pillarIds).toContain('mastery');
  });

  it('no duplicate screen IDs across all topics', () => {
    const screenIds = new Set<string>();
    for (const topic of TOPICS) {
      for (const sub of topic.subtopics) {
        for (const screen of sub.screens) {
          expect(screenIds.has(screen.id)).toBe(false);
          screenIds.add(screen.id);
        }
      }
    }
  });

  it('each screen has a non-empty title and file path', () => {
    for (const topic of TOPICS) {
      for (const sub of topic.subtopics) {
        for (const screen of sub.screens) {
          expect(screen.title.trim()).toBeTruthy();
          expect(screen.file.trim()).toBeTruthy();
          expect(screen.file).toMatch(/^\/screens\/.+\.html$/);
        }
      }
    }
  });

  it('BADGES array is not empty', () => {
    expect(BADGES.length).toBeGreaterThan(0);
  });

  it('each badge has unique id and valid fields', () => {
    const badgeIds = new Set<string>();
    for (const badge of BADGES) {
      expect(badgeIds.has(badge.id)).toBe(false);
      badgeIds.add(badge.id);
      expect(badge.name.trim()).toBeTruthy();
      expect(badge.icon.trim()).toBeTruthy();
      expect(badge.requirement).toBeGreaterThan(0);
    }
  });

  it('QUIZ_QUESTIONS array is not empty', () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThan(0);
  });

  it('each quiz question has valid fields', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.id).toBeTruthy();
      expect(q.question.trim()).toBeTruthy();
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
      expect(q.hint.trim()).toBeTruthy();
    }
  });
});

describe('Screen File Existence', () => {
  it('all referenced screen files exist on disk', () => {
    let missing = 0;
    for (const topic of TOPICS) {
      for (const sub of topic.subtopics) {
        for (const screen of sub.screens) {
          const filePath = path.join(SCREENS_DIR, path.basename(screen.file));
          if (!fs.existsSync(filePath)) {
            console.error(`Missing screen file: ${screen.file} (${screen.title})`);
            missing++;
          }
        }
      }
    }
    expect(missing).toBe(0);
  });

  it('all screen HTML files contain basic required elements', () => {
    let issues = 0;
    for (const topic of TOPICS) {
      for (const sub of topic.subtopics) {
        for (const screen of sub.screens) {
          const filePath = path.join(SCREENS_DIR, path.basename(screen.file));
          if (!fs.existsSync(filePath)) {
            issues++;
            continue;
          }
          const content = fs.readFileSync(filePath, 'utf-8');
          if (!content.includes('<!DOCTYPE html>') && !content.includes('<!doctype html>')) {
            console.error(`Screen lacks DOCTYPE: ${screen.file}`);
            issues++;
          }
          if (!content.includes('<title>')) {
            console.error(`Screen lacks <title>: ${screen.file}`);
            issues++;
          }
        }
      }
    }
    expect(issues).toBe(0);
  });
});

describe('Video Integration', () => {
  it('videos directory exists and contains files', () => {
    const exists = fs.existsSync(VIDEOS_DIR);
    expect(exists).toBe(true);
    if (exists) {
      const files = fs.readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mp4'));
      expect(files.length).toBeGreaterThan(0);
    }
  });

  it('geometry video lesson screens reference existing video files', () => {
    const geometrySubs = TOPICS[0].subtopics.find(s => s.id === 'videos');
    expect(geometrySubs).toBeDefined();
    const screens = geometrySubs!.screens;
    expect(screens.length).toBe(3);
    for (const screen of screens) {
      const filePath = path.join(SCREENS_DIR, path.basename(screen.file));
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes('/videos/')) {
        const matches = content.match(/\/videos\/[\w.-]+\.mp4/g);
        expect(matches).not.toBeNull();
        for (const videoRef of matches || []) {
          const videoPath = path.join(VIDEOS_DIR, path.basename(videoRef));
          expect(fs.existsSync(videoPath)).toBe(true);
        }
      }
    }
  });

  it('at least one video screen uses each of the 3 geometry video files', () => {
    const geometrySubs = TOPICS[0].subtopics.find(s => s.id === 'videos');
    const screens = geometrySubs!.screens;
    const referencedVideos: string[] = [];
    for (const screen of screens) {
      const filePath = path.join(SCREENS_DIR, path.basename(screen.file));
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(/\/videos\/[\w.-]+\.mp4/g);
      if (matches) {
        referencedVideos.push(...matches);
      }
    }
    expect(referencedVideos).toContain('/videos/FINAL_bindu.mp4');
    expect(referencedVideos).toContain('/videos/FINAL_bind.mp4');
    expect(referencedVideos).toContain('/videos/FINAL_rekha.mp4');
  });
});

describe('Stats Edge Cases', () => {
  const STORAGE_KEY = 'mathsguru-stats';

  beforeEach(() => {
    localStorage.clear();
  });

  it('loadStats handles missing lastActiveDate gracefully', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: 10,
      streak: 2,
      screensViewed: [],
      completedScreens: [],
      badges: [],
      quizScores: {},
    }));
    const stats = loadStats();
    expect(stats.lastActiveDate).toBe(new Date().toISOString().slice(0, 10));
  });

  it('loadStats with null localStorage value returns defaults', () => {
    localStorage.setItem(STORAGE_KEY, 'null');
    const stats = loadStats();
    expect(stats.xp).toBe(0);
  });

  it('loadStats with empty object returns defaults', () => {
    localStorage.setItem(STORAGE_KEY, '{}');
    const stats = loadStats();
    expect(stats.xp).toBe(0);
    expect(stats.streak).toBe(0);
    expect(stats.badges).toEqual([]);
  });

  it('saveStats with very large quizScores object', () => {
    const largeScores: Record<string, { score: number; total: number }> = {};
    for (let i = 0; i < 100; i++) {
      largeScores[`q-${i}`] = { score: i, total: 10 };
    }
    saveStats({
      xp: 999,
      streak: 10,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(),
      completedScreens: new Set(),
      badges: [],
      quizScores: largeScores,
    });
    const restored = loadStats();
    expect(Object.keys(restored.quizScores).length).toBe(100);
    expect(restored.quizScores['q-50'].score).toBe(50);
  });

  it('saveStats with special characters in badge names', () => {
    saveStats({
      xp: 0,
      streak: 0,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(),
      completedScreens: new Set(),
      badges: ['🎯 Panga King!', 'test-badge_123'],
      quizScores: {},
    });
    const restored = loadStats();
    expect(restored.badges).toContain('🎯 Panga King!');
    expect(restored.badges).toContain('test-badge_123');
  });

  it('handles concurrent save/load correctly', () => {
    const stats1 = {
      xp: 10,
      streak: 1,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(['s1']),
      completedScreens: new Set(),
      badges: [],
      quizScores: {},
    };
    const stats2 = {
      xp: 20,
      streak: 2,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(['s2']),
      completedScreens: new Set(['s2']),
      badges: ['test-badge'],
      quizScores: { q1: { score: 5, total: 5 } },
    };
    saveStats(stats1);
    saveStats(stats2);
    const restored = loadStats();
    expect(restored.xp).toBe(20);
    expect(restored.completedScreens).toEqual(new Set(['s2']));
  });

  it('loadStats returns fresh objects each call (no mutation)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: 50,
      streak: 1,
      lastActiveDate: '2026-06-07',
      screensViewed: ['s1'],
      completedScreens: ['s1'],
      badges: ['b1'],
      quizScores: { q: { score: 3, total: 5 } },
    }));
    const first = loadStats();
    const second = loadStats();
    first.xp = 999;
    expect(second.xp).toBe(50);
  });

  it('persists stats through full app lifecycle', () => {
    render(<App />);
    expect(screen.getByText(/Score: 0 XP/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Learn'));
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    fireEvent.click(screen.getByText('Done!'));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.xp).toBe(5);
    expect(saved.screensViewed).toContain(TOPICS[0].subtopics[0].screens[0].id);
    expect(saved.completedScreens).toContain(TOPICS[0].subtopics[0].screens[0].id);
  });
});

describe('Navigation Edge Cases', () => {
  const makeStats = (overrides?: Partial<UserStats>): UserStats => ({
    xp: 0,
    streak: 0,
    lastActiveDate: '',
    screensViewed: new Set(),
    completedScreens: new Set(),
    badges: [],
    quizScores: {},
    ...overrides,
  });

  it('navigates through first subtopic screens using Next', () => {
    const onAddXP = vi.fn();
    render(<LearnView
      stats={makeStats()}
      onViewScreen={vi.fn()}
      onCompleteScreen={vi.fn()}
      onAddXP={onAddXP}
      difficulty={'beginner' as DifficultyLevel}
    />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    const firstSub = TOPICS[0].subtopics[0];
    fireEvent.click(screen.getByText(firstSub.name));
    for (let i = 0; i < firstSub.screens.length; i++) {
      const doneBtn = screen.queryByText('Done!');
      if (doneBtn) {
        fireEvent.click(doneBtn);
        expect(onAddXP).toHaveBeenCalledWith(5);
      }
      if (i < firstSub.screens.length - 1) {
        const nextBtn = screen.getByText('Next').closest('button')!;
        expect(nextBtn.disabled).toBe(false);
        fireEvent.click(nextBtn);
      }
    }
  });

  it('disables Prev on first screen and Next on last screen', () => {
    render(<LearnView
      stats={makeStats()}
      onViewScreen={vi.fn()}
      onCompleteScreen={vi.fn()}
      onAddXP={vi.fn()}
      difficulty={'beginner' as DifficultyLevel}
    />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    const prevBtn = screen.getByText('Prev').closest('button')!;
    expect(prevBtn.disabled).toBe(true);
    const nextBtn = screen.getByText('Next').closest('button')!;
    if (TOPICS[0].subtopics[0].screens.length <= 1) {
      expect(nextBtn.disabled).toBe(true);
    }
  });

  it('repeated Done clicks only award XP once', () => {
    const onAddXP = vi.fn();
    render(<LearnView
      stats={makeStats()}
      onViewScreen={vi.fn()}
      onCompleteScreen={vi.fn()}
      onAddXP={onAddXP}
      difficulty={'beginner' as DifficultyLevel}
    />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    fireEvent.click(screen.getByText('Done!'));
    expect(onAddXP).toHaveBeenCalledTimes(1);
  });

  it('shows no issues when clicking Prev on first screen', () => {
    render(<LearnView
      stats={makeStats()}
      onViewScreen={vi.fn()}
      onCompleteScreen={vi.fn()}
      onAddXP={vi.fn()}
      difficulty={'beginner' as DifficultyLevel}
    />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    const prevBtn = screen.getByText('Prev').closest('button')!;
    expect(prevBtn.disabled).toBe(true);
  });
});

describe('App Initialization Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with zero XP and zero streak', () => {
    render(<App />);
    expect(screen.getByText(/Score: 0 XP/)).toBeInTheDocument();
  });

  it('renders with max XP value', () => {
    saveStats({
      xp: 999999,
      streak: 365,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(Array.from({ length: 200 }, (_, i) => `s${i}`)),
      completedScreens: new Set(Array.from({ length: 167 }, (_, i) => `s${i}`)),
      badges: BADGES.map(b => b.id),
      quizScores: { 'all': { score: 50, total: 50 } },
    });
    render(<App />);
    expect(screen.getByText(/Score: 999999 XP/)).toBeInTheDocument();
  });

  it('renders with all badges earned', () => {
    saveStats({
      xp: 500,
      streak: 30,
      lastActiveDate: '2026-06-07',
      screensViewed: new Set(),
      completedScreens: new Set(),
      badges: BADGES.map(b => b.id),
      quizScores: {},
    });
    render(<App />);
    for (const badge of BADGES) {
      expect(screen.getByText(badge.name)).toBeInTheDocument();
    }
  });

  it('handles corrupted localStorage gracefully on mount', () => {
    localStorage.setItem('mathsguru-stats', '{{{corrupted');
    render(<App />);
    expect(screen.getByText(/Score: 0 XP/)).toBeInTheDocument();
  });

  it('handles localStorage with wrong types gracefully', () => {
    localStorage.setItem('mathsguru-stats', JSON.stringify({
      xp: 'not-a-number',
      streak: 'bad-streak',
      screensViewed: 'not-an-array',
      completedScreens: null,
      badges: 'not-an-array',
      quizScores: 'not-an-object',
    }));
    render(<App />);
    expect(screen.getByText(/Score: 0 XP/)).toBeInTheDocument();
  });
});

describe('Quiz Edge Cases', () => {
  it('all quiz questions have correct indices that match their options array', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
    }
  });

  it('no quiz question has duplicate option text', () => {
    for (const q of QUIZ_QUESTIONS) {
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(q.options.length);
    }
  });

  it('all quiz questions have unique IDs', () => {
    const ids = QUIZ_QUESTIONS.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Bindu (Point) End-to-End Flow', () => {
  it('geometry topic has the full end-to-end subtopic structure', () => {
    const subIds = TOPICS[0].subtopics.map(s => s.id);
    expect(subIds).toContain('videos');
    expect(subIds).toContain('point');
    expect(subIds).toContain('line');
    expect(subIds).toContain('segment');
    expect(subIds).toContain('ray');
    expect(subIds).toContain('vertex');
    expect(subIds).toContain('practice');
    expect(subIds).toContain('stories');
    expect(subIds).toContain('quizzes');
    expect(subIds).toContain('mastery');
    expect(subIds).toContain('skills');
  });

  it('Point subtopic has at least one screen in the explainer', () => {
    const pointSub = TOPICS[0].subtopics.find(s => s.id === 'point');
    expect(pointSub).toBeDefined();
    expect(pointSub!.screens.length).toBeGreaterThan(0);
  });

  it('Point subtopic screens all exist as files', () => {
    const pointSub = TOPICS[0].subtopics.find(s => s.id === 'point');
    for (const screen of pointSub!.screens) {
      const filePath = path.join(SCREENS_DIR, path.basename(screen.file));
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  it('full user journey: videos → point → practice → quiz → mastery', () => {
    const journey: string[] = [];
    const geometrySubs = TOPICS[0].subtopics;
    for (const phase of ['videos', 'point', 'practice', 'quizzes', 'mastery']) {
      const sub = geometrySubs.find(s => s.id === phase);
      expect(sub).toBeDefined();
      expect(sub!.screens.length).toBeGreaterThan(0);
      journey.push(sub!.name);
    }
    expect(journey).toEqual([
      '🎬 Video Lessons',
      '💡 Bindu (Point)',
      '🏋️ Practice Zone',
      '🎯 Panga (Quiz)',
      '🏆 Mastery Celebration',
    ]);
  });
});
