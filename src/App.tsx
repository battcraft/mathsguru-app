import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Trophy, Sparkles, GraduationCap } from 'lucide-react';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { QuizView } from './components/QuizView';
import { StoryView } from './components/StoryView';
import type { UserStats, DifficultyLevel } from './types';

const STORAGE_KEY = 'mathsguru-stats';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function loadStats(): UserStats {
  const today = todayStr();
  const yesterday = yesterdayStr();

  const defaults: UserStats = {
    xp: 0, streak: 0, lastActiveDate: '',
    screensViewed: new Set(), completedScreens: new Set(),
    badges: [], quizScores: {},
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const last = parsed.lastActiveDate || '';
      let streak = parsed.streak || 0;

      if (last === today) {
        // already active today — keep streak
      } else if (last === yesterday) {
        streak += 1;
      } else if (last || parsed.lastActiveDate !== undefined) {
        streak = 1;
      }

      return {
        xp: typeof parsed.xp === 'number' && !Number.isNaN(parsed.xp) ? parsed.xp : 0,
        streak,
        lastActiveDate: today,
        screensViewed: new Set(parsed.screensViewed || []),
        completedScreens: new Set(parsed.completedScreens || []),
        badges: parsed.badges || [],
        quizScores: parsed.quizScores || {},
      };
    }
  } catch {}
  return { ...defaults, lastActiveDate: today, streak: 0 };
}

export function saveStats(stats: UserStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...stats,
    screensViewed: Array.from(stats.screensViewed),
    completedScreens: Array.from(stats.completedScreens),
  }));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [stats, setStats] = useState<UserStats>(loadStats);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  const [quizRestartKey, setQuizRestartKey] = useState(0);

  useEffect(() => { saveStats(stats); }, [stats]);

  const updateStats = useCallback((fn: (s: UserStats) => UserStats) => {
    setStats(prev => {
      const next = fn(prev);
      return { ...next };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    updateStats(s => ({ ...s, xp: s.xp + amount }));
  }, [updateStats]);

  const markViewed = useCallback((screenId: string) => {
    updateStats(s => ({
      ...s,
      screensViewed: new Set([...s.screensViewed, screenId]),
    }));
  }, [updateStats]);

  const markComplete = useCallback((screenId: string) => {
    updateStats(s => ({
      ...s,
      screensViewed: new Set([...s.screensViewed, screenId]),
      completedScreens: new Set([...s.completedScreens, screenId]),
    }));
  }, [updateStats]);

  const startQuiz = useCallback(() => {
    setActiveTab('quiz');
    setQuizRestartKey(k => k + 1);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: Trophy },
    { id: 'story', label: 'Story', icon: Sparkles },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[var(--bg-warm)] font-body">
      {/* Header */}
      <div className="bg-[var(--bg-warm)] border-b-2 border-black sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-lg font-headline font-bold text-[var(--mango)]">MathsGuru AI 🧮</h1>
          <div className="flex items-center gap-2">
            <span className="bg-[var(--mango)] text-white text-xs font-bold px-2 py-1 rounded border border-black shadow-[1px_1px_0px_var(--black)]">
              Score: {stats.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeView
                stats={stats}
                onStartQuiz={startQuiz}
                onNavigate={setActiveTab}
                difficulty={difficulty}
                onSetDifficulty={setDifficulty}
                onAddXP={addXP}
              />
            </motion.div>
          )}
          {activeTab === 'learn' && (
            <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LearnView
                stats={stats}
                onViewScreen={markViewed}
                onCompleteScreen={markComplete}
                onAddXP={addXP}
                difficulty={difficulty}
              />
            </motion.div>
          )}
          {activeTab === 'quiz' && (
            <motion.div key={`quiz-${quizRestartKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuizView
                stats={stats}
                onAddXP={addXP}
                onCompleteQuiz={(setId, score, total) => {
                  updateStats(s => ({
                    ...s,
                    quizScores: { ...s.quizScores, [setId]: { score, total } },
                  }));
                }}
                difficulty={difficulty}
              />
            </motion.div>
          )}
          {activeTab === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StoryView onAddXP={addXP} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-50 max-w-md mx-auto">
        <div className="flex justify-around py-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center px-4 py-1.5 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-[var(--mango)] text-white border-2 border-black shadow-[2px_2px_0px_var(--black)]' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}>
                <Icon size={20} />
                <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
