import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle, BookOpen, ChevronDown } from 'lucide-react';
import { TOPICS } from '../data';
import type { UserStats, DifficultyLevel } from '../types';

interface Props {
  stats: UserStats;
  onViewScreen: (screenId: string) => void;
  onCompleteScreen: (screenId: string) => void;
  onAddXP: (amount: number) => void;
  difficulty: DifficultyLevel;
}

export function LearnView({ stats, onViewScreen, onCompleteScreen, onAddXP, difficulty }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [selectedScreenIdx, setSelectedScreenIdx] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const completingRef = useRef(false);

  const topic = TOPICS.find(t => t.id === selectedTopic);
  const subtopic = topic?.subtopics.find(s => s.id === selectedSubtopic);
  const screens = subtopic?.screens || [];
  const currentScreen = screens[selectedScreenIdx];

  // Mark screen as viewed
  useEffect(() => {
    if (currentScreen) {
      onViewScreen(currentScreen.id);
    }
  }, [currentScreen?.id]);

  // Listen for score postMessage from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const allowedOrigins = [window.location.origin, 'null', ''];
      if (!allowedOrigins.includes(e.origin)) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data.type === 'score' && typeof data.score === 'number') {
          const clamped = Math.max(0, Math.min(100, data.score));
          onAddXP(clamped);
        }
      } catch {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Show topic list
  if (!selectedTopic) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-6">
        <h2 className="text-xl font-headline font-bold text-[var(--mango)] mb-4 flex items-center gap-2">
          <BookOpen size={22} /> Padho (Learn)
        </h2>
        <p className="text-sm text-gray-600 mb-4">Apna topic chuno aur seekho!</p>
        <div className="space-y-3">
          {TOPICS.map(t => {
            const totalScreens = t.subtopics.reduce((acc, s) => acc + s.screens.length, 0);
            const completedCount = t.subtopics.reduce((acc, s) =>
              acc + s.screens.filter(sc => stats.completedScreens.has(sc.id)).length, 0);
            const pct = totalScreens > 0 ? Math.round((completedCount / totalScreens) * 100) : 0;
            return (
              <button key={t.id} onClick={() => setSelectedTopic(t.id)}
                className="w-full bg-white p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] text-left hover:translate-y-[1px] transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">{t.name}</h3>
                    <p className="text-xs text-gray-500">{t.subtopics.length} subtopics • {totalScreens} screens</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--mango)]">{pct}%</div>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full border border-black">
                        <div className="h-full bg-[var(--mango)] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Show subtopics
  if (!selectedSubtopic && topic) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-6">
        <button onClick={() => setSelectedTopic(null)} className="text-sm text-[var(--mango)] underline mb-3 flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Topics
        </button>
        <h2 className="text-xl font-headline font-bold text-[var(--mango)] mb-4">{topic.name}</h2>
        <div className="space-y-2">
          {topic.subtopics.map(sub => {
            const completedCount = sub.screens.filter(s => stats.completedScreens.has(s.id)).length;
            const pct = sub.screens.length > 0 ? Math.round((completedCount / sub.screens.length) * 100) : 0;
            return (
              <button key={sub.id} onClick={() => { setSelectedSubtopic(sub.id); setSelectedScreenIdx(0); }}
                className="w-full bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_var(--black)] text-left hover:translate-y-[1px] transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{sub.name}</h3>
                    <p className="text-xs text-gray-500">{sub.screens.length} screens • {completedCount} done</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--mango)]">{pct}%</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Show screens with viewer
  if (topic && subtopic && screens.length > 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        {/* Breadcrumb */}
        <div className="px-4 py-2 bg-[var(--yellow-light)] border-b-2 border-black text-xs flex items-center gap-1 flex-wrap">
          <button onClick={() => { setSelectedTopic(null); setSelectedSubtopic(null); }}
            className="text-[var(--mango)] font-bold hover:underline">{topic.name}</button>
          <span>›</span>
          <button onClick={() => setSelectedSubtopic(null)}
            className="text-[var(--mango)] font-bold hover:underline">{subtopic.name}</button>
          <span>›</span>
          <span className="text-gray-600">Screen {selectedScreenIdx + 1} of {screens.length}</span>
        </div>

        {/* Screen List Sidebar (horizontal scroll) */}
        <div className="px-4 py-2 border-b border-gray-200 overflow-x-auto flex gap-1.5">
          {screens.map((s, i) => {
            const viewed = stats.screensViewed.has(s.id);
            const completed = stats.completedScreens.has(s.id);
            return (
              <button key={s.id} onClick={() => setSelectedScreenIdx(i)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold border-2 border-black whitespace-nowrap transition-all ${
                  i === selectedScreenIdx ? 'bg-[var(--mango)] text-white' :
                  completed ? 'bg-green-100' : viewed ? 'bg-[var(--yellow-light)]' : 'bg-white'
                }`}>
                {completed ? '✓ ' : viewed ? '👁 ' : ''}{i + 1}
              </button>
            );
          })}
        </div>

        {/* Iframe Viewer */}
        <div className="relative bg-white" style={{ height: 'calc(100vh - 14rem)' }}>
          {currentScreen && (
            <iframe ref={iframeRef}
              src={currentScreen.file}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              onLoad={() => onViewScreen(currentScreen.id)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="px-4 py-3 bg-white border-t-2 border-black flex items-center justify-between">
          <button onClick={() => setSelectedScreenIdx(i => Math.max(0, i - 1))}
            disabled={selectedScreenIdx === 0}
            className="bg-white px-4 py-2 rounded-lg border-2 border-black font-bold text-sm disabled:opacity-30 hover:translate-y-[1px] shadow-[2px_2px_0px_var(--black)] transition-all flex items-center gap-1">
            <ArrowLeft size={16} /> Prev
          </button>
          <span className="text-xs text-gray-500 font-bold">{selectedScreenIdx + 1}/{screens.length}</span>
          <div className="flex gap-2">
            {currentScreen && !stats.completedScreens.has(currentScreen.id) && (
              <button onClick={() => {
                if (completingRef.current) return;
                completingRef.current = true;
                onCompleteScreen(currentScreen.id);
                onAddXP(5);
                // Reset guard so subsequent screens can also be completed
                setTimeout(() => { completingRef.current = false; }, 100);
              }}
                className="bg-[var(--green)] text-white px-4 py-2 rounded-lg border-2 border-black font-bold text-sm hover:translate-y-[1px] shadow-[2px_2px_0px_var(--black)] transition-all flex items-center gap-1">
                <CheckCircle size={16} /> Done!
              </button>
            )}
            <button onClick={() => setSelectedScreenIdx(i => Math.min(screens.length - 1, i + 1))}
              disabled={selectedScreenIdx >= screens.length - 1}
              className="bg-[var(--mango)] text-white px-4 py-2 rounded-lg border-2 border-black font-bold text-sm disabled:opacity-30 hover:translate-y-[1px] shadow-[2px_2px_0px_var(--black)] transition-all flex items-center gap-1">
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-gray-500">Loading...</div>;
}
