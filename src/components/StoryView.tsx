import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw } from 'lucide-react';
import { STORY_SLIDES } from '../data';

interface Props {
  onAddXP: (amount: number) => void;
}

export function StoryView({ onAddXP }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);

  const slide = STORY_SLIDES[currentSlide];
  const totalSlides = STORY_SLIDES.length;

  const handleChoice = (choiceIdx: number) => {
    setSelectedChoice(choiceIdx);
    setShowResult(true);
    const isCorrect = slide.choices[choiceIdx].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      onAddXP(15);
    }
    setTimeout(() => {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(i => i + 1);
        setSelectedChoice(null);
        setShowResult(false);
      } else {
        setStoryComplete(true);
      }
    }, 1500);
  };

  if (storyComplete) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-headline font-bold mb-2">Kahani Khatam!</h2>
        <p className="text-gray-600 text-center mb-4">
          {score === totalSlides
            ? 'Perfect score! Aap Chandni Chowk ke asli hero ho! 🌟'
            : `${score}/${totalSlides} sahi! Thoda aur practice karo!`}
        </p>
        <div className="bg-[var(--yellow-light)] p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] text-center mb-6">
          <div className="text-3xl font-headline font-bold text-[var(--mango)]">{score}/{totalSlides}</div>
          <div className="text-sm text-gray-600 mt-1">Correct Answers</div>
        </div>
        <button onClick={() => { setCurrentSlide(0); setScore(0); setSelectedChoice(null); setShowResult(false); setStoryComplete(false); }}
          className="bg-[var(--mango)] text-white font-bold px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] hover:translate-y-[2px] transition-all flex items-center gap-2">
          <RefreshCw size={18} /> Dobara Kahani Suno
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-headline font-bold text-[var(--mango)]">📖 Kahani Mode</h2>
        <span className="text-xs font-bold bg-[var(--yellow-light)] px-2 py-1 rounded border border-black">
          {currentSlide + 1}/{totalSlides}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 border border-black">
        <div className="h-full bg-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }} />
      </div>

      {/* Story Card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide}
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
          className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_var(--black)]">
          <div className="text-center text-5xl mb-3">{slide.emoji}</div>
          <h3 className="font-bold text-lg text-center mb-3">{slide.title}</h3>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{slide.narration}</p>

          {/* Choices */}
          <div className="space-y-2">
            {slide.choices.map((choice, i) => {
              let bg = 'bg-white hover:bg-[var(--yellow-light)]';
              if (showResult && selectedChoice === i) {
                bg = choice.correct ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
              } else if (showResult && choice.correct) {
                bg = 'bg-green-50';
              }
              return (
                <button key={i} onClick={() => !showResult && handleChoice(i)} disabled={showResult}
                  className={`w-full text-left p-3 rounded-lg border-2 border-black transition-all ${bg}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-400 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{choice.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`mt-3 p-2 rounded-lg text-sm font-bold text-center ${
              slide.choices[selectedChoice!].correct
                ? 'bg-green-50 text-green-700 border border-green-300'
                : 'bg-red-50 text-red-700 border border-red-300'
            }`}>
              {slide.choices[selectedChoice!].correct ? '🎉 Sahi! +15 XP' : '😅 Galat! Agle step mein try karo!'}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Score */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Score: {score}/{currentSlide + (showResult ? 1 : 0)} correct
      </div>
    </div>
  );
}
