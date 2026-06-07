import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Flame, Award, Zap, BookOpen, Sparkles, ChevronRight, Send,
  GraduationCap, Camera, MessageCircle, Star, TrendingUp
} from 'lucide-react';
import { BADGES, DAILY_RIDDLES, CHAT_TUTOR, DIFFICULTY_LEVELS, TOPICS, type DifficultyLevel } from '../data';
import type { UserStats } from '../types';

const mascotMessages = [
  "Hero! Aaj kya seekhoge? 🧮",
  "Bazaar khul gaya! Chalo padhte hain! 📚",
  "Maths is everywhere — bazaar mein, cricket mein, kahin bhi! 🌟",
  "Champion banne ka time aa gaya! 💪",
];

interface Props {
  stats: UserStats;
  onStartQuiz: () => void;
  onNavigate: (tab: string) => void;
  difficulty: DifficultyLevel;
  onSetDifficulty: (d: DifficultyLevel) => void;
}

export function HomeView({ stats, onStartQuiz, onNavigate, difficulty, onSetDifficulty }: Props) {
  const [mascotIdx] = useState(Math.floor(Math.random() * mascotMessages.length));
  const [riddleIdx] = useState(Math.floor(Math.random() * DAILY_RIDDLES.length));
  const [riddleAnswer, setRiddleAnswer] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [showChat, setShowChat] = useState(false);

  const riddle = DAILY_RIDDLES[riddleIdx];
  const currentLevel = DIFFICULTY_LEVELS.find(l => l.id === difficulty)!;

  const unlockedBadges = BADGES.filter(b => {
    if (b.id === 'streak-star') return stats.streak >= b.requirement;
    if (b.id === 'desi-explorer') return stats.completedScreens.size > 0;
    if (b.id === 'bullet-brain') return stats.completedScreens.size >= b.requirement;
    return false;
  });

  const handleChat = (q: string) => {
    const key = q.toLowerCase().trim();
    const response = CHAT_TUTOR[key] || "Achha sawaal hai hero! Abhi iska jawab prepare ho raha hai. Thoda wait karo! 😊";
    setChatResponse(response);
    setShowChat(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-6">
      {/* Banner */}
      <div className="bg-[var(--mango)] text-white p-5 border-b-4 border-black">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">Desi Math Wizard</span>
        </div>
        <h1 className="text-2xl font-headline font-bold mb-2">Namaste, Math Hero! 👋</h1>
        <p className="text-sm opacity-90">{mascotMessages[mascotIdx]}</p>
        <button onClick={onStartQuiz} className="mt-3 bg-white text-[var(--mango)] font-bold px-5 py-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_var(--black)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_var(--black)] transition-all">
          Start Practice Drill 🎯
        </button>
      </div>

      {/* Difficulty Level Selector */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap size={18} className="text-[var(--mango)]" />
          <span className="font-bold text-sm">Apna Level Chuno:</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTY_LEVELS.map(level => (
            <button key={level.id} onClick={() => onSetDifficulty(level.id)}
              className={`p-2.5 rounded-lg border-2 border-black text-center transition-all ${
                difficulty === level.id 
                  ? 'shadow-[3px_3px_0px_var(--black)] font-bold' 
                  : 'shadow-[2px_2px_0px_var(--black)] opacity-70'
              }`}
              style={{ backgroundColor: difficulty === level.id ? level.color + '33' : '#f0f0f0' }}>
              <div className="text-sm font-bold">{level.name}</div>
              <div className="text-xs text-gray-600">{level.className}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 grid grid-cols-3 gap-2 my-3">
        <div className="bg-[var(--yellow-light)] p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Bazaar Coins</span>
          <div className="text-xl font-headline font-bold text-[var(--mango)]">{stats.xp}</div>
          <div className="text-[10px] text-gray-500">Rank: {stats.xp >= 5000 ? 'MathsGuru' : stats.xp >= 1000 ? 'Scholar' : stats.xp >= 200 ? 'Learner' : 'Nimbu Scholar'}</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Streak 🔥</span>
          <div className="text-xl font-headline font-bold text-red-500">{stats.streak}</div>
          <div className="text-[10px] text-gray-500">{stats.streak > 0 ? 'Keep going!' : 'Start today!'}</div>
        </div>
        <div className="bg-[#63ff9d]/10 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Screens</span>
          <div className="text-xl font-headline font-bold text-green-600">{stats.completedScreens.size}</div>
          <div className="text-[10px] text-gray-500">Explored</div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 my-4">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Award size={16} className="text-[var(--mango)]" /> Badges ({unlockedBadges.length}/{BADGES.length})
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {BADGES.map(badge => {
            const unlocked = unlockedBadges.find(u => u.id === badge.id);
            return (
              <div key={badge.id} className={`text-center p-2 rounded-lg border-2 border-black ${unlocked ? 'bg-[var(--yellow-light)]' : 'bg-gray-100 opacity-40'}`}>
                <div className="text-lg">{unlocked ? '🏅' : '🔒'}</div>
                <div className="text-[9px] font-bold leading-tight">{badge.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Riddle */}
      <div className="mx-4 my-4 bg-[var(--yellow-light)] p-4 rounded-lg border-2 border-black shadow-[3px_3px_0px_var(--black)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm flex items-center gap-2">🧩 Daily Riddle</h3>
          <span className="bg-[var(--mango)] text-white text-[10px] font-bold px-2 py-0.5 rounded border border-black">XP +20</span>
        </div>
        <p className="text-sm font-medium mb-3">{riddle.question}</p>
        <div className="grid grid-cols-3 gap-2">
          {riddle.options.map((opt, i) => (
            <button key={i} onClick={() => setRiddleAnswer(i)}
              className={`text-sm font-bold py-2 rounded-lg border-2 border-black transition-all ${
                riddleAnswer === i
                  ? i === riddle.correct ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}>
              {opt}
            </button>
          ))}
        </div>
        {riddleAnswer !== null && (
          <p className="text-xs mt-2 font-medium">{riddleAnswer === riddle.correct ? '🎉 Sahi jawab! +20 XP!' : '😅 Galat! Sahi jawab: ' + riddle.options[riddle.correct]}</p>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="px-4 my-3">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <TrendingUp size={16} className="text-[var(--mango)]" /> Quick Access
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onNavigate('learn')} className="bg-[#63ff9d]/10 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] text-left hover:translate-y-[1px] transition-all">
            <BookOpen size={20} className="text-blue-500 mb-1" />
            <div className="text-sm font-bold">📚 Padho</div>
            <div className="text-[10px] text-gray-500">{TOPICS.reduce((a, t) => a + t.subtopics.reduce((b, s) => b + s.screens.length, 0), 0)} screens explore karo</div>
          </button>
          <button onClick={() => onNavigate('story')} className="bg-purple-50 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] text-left hover:translate-y-[1px] transition-all">
            <Sparkles size={20} className="text-purple-500 mb-1" />
            <div className="text-sm font-bold">📖 Kahani</div>
            <div className="text-[10px] text-gray-500">Math stories padho</div>
          </button>
        </div>
      </div>

      {/* Chat Tutor */}
      <div className="mx-4 my-4 bg-white p-4 rounded-lg border-2 border-black shadow-[3px_3px_0px_var(--black)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm flex items-center gap-2">💬 Bhaiya ka Chaupal</h3>
          <span className="text-[10px] font-bold bg-[var(--green)] text-white px-2 py-0.5 rounded border border-black">Hinglish Help!</span>
        </div>
        <p className="text-xs text-gray-600 mb-3">Koi bhi math doubt ho, pooch lo!</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Object.keys(CHAT_TUTOR).slice(0, 6).map(q => (
            <button key={q} onClick={() => handleChat(q)}
              className="text-[11px] bg-[var(--yellow-light)] px-2.5 py-1.5 rounded-lg border border-black hover:bg-[var(--mango)] hover:text-white transition-all">
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && chatInput.trim()) { handleChat(chatInput.trim()); setChatInput(''); }}}
            placeholder="Bhaiya se pucho..."
            className="flex-1 text-sm px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:border-[var(--mango)]" />
          <button onClick={() => { if (chatInput.trim()) { handleChat(chatInput.trim()); setChatInput(''); }}}
            className="bg-[var(--mango)] text-white px-3 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] hover:translate-y-[1px]">
            <Send size={16} />
          </button>
        </div>
        {showChat && chatResponse && (
          <div className="mt-3 bg-[var(--yellow-light)] p-3 rounded-lg border border-black text-sm">
            <span className="font-bold">MathsGuru Bhaiya:</span> {chatResponse}
          </div>
        )}
      </div>

      {/* Photo se Pucho (OCR Placeholder) */}
      <div className="mx-4 my-4 bg-gradient-to-r from-[var(--mango)] to-[#cc5500] p-4 rounded-lg border-2 border-black shadow-[3px_3px_0px_var(--black)] text-white">
        <div className="flex items-center gap-3">
          <Camera size={32} />
          <div>
            <h3 className="font-bold text-sm">📸 Photo se Pucho</h3>
            <p className="text-xs opacity-90">Maths ka sawaal ka photo lo aur Bhaiya se pucho!</p>
            <p className="text-[10px] mt-1 opacity-75">Coming Soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
