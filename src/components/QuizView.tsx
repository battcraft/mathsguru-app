import React, { useState } from 'react';
import { Trophy, RefreshCw, ArrowRight, CheckCircle2, XCircle, Timer, Sparkles, Lightbulb } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';
import type { UserStats, DifficultyLevel, QuizQuestion } from '../types';

interface Props {
  stats: UserStats;
  onAddXP: (amount: number) => void;
  onCompleteQuiz: (setId: string, score: number, total: number) => void;
  difficulty: DifficultyLevel;
}

export function QuizView({ stats, onAddXP, onCompleteQuiz, difficulty }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Shuffle and pick 5 questions
  const [questions] = useState<QuizQuestion[]>(() => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });

  const current = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (optionIdx: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIdx);
    setShowResult(true);
    const isCorrect = optionIdx === current.correct;
    const newAnswered = [...answered];
    newAnswered[currentIndex] = isCorrect;
    setAnswered(newAnswered);
    if (isCorrect) {
      setScore(s => s + 1);
      onAddXP(10);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      const finalScore = score;
      onCompleteQuiz('daily-quiz-' + Date.now(), finalScore, totalQuestions);
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
    setShowHint(false);
    setQuizComplete(false);
    setQuestions(shuffleQuestions());
  };

  const setQuestions = (_q: QuizQuestion[]) => {};
  const shuffleQuestions = (): QuizQuestion[] => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
  };

  if (quizComplete) {
    const pct = Math.round((score / totalQuestions) * 100);
    const isGreat = pct >= 80;
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
        <div className={`text-6xl mb-4 ${isGreat ? '' : 'grayscale'}`}>{isGreat ? '🏆' : '💪'}</div>
        <h2 className="text-2xl font-headline font-bold mb-2">
          {isGreat ? 'MathsGuru Champion!' : 'Keep Trying Hero!'}
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          {isGreat
            ? 'Bhaiya proud hai! Aap real MathsGuru ban rahe ho!'
            : 'Thoda aur practice karo, next time 100% hoga!'}
        </p>
        <div className="bg-[var(--yellow-light)] p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] text-center mb-6">
          <div className="text-3xl font-headline font-bold text-[var(--mango)]">{score}/{totalQuestions}</div>
          <div className="text-sm text-gray-600 mt-1">{pct}% Correct</div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleRestart} className="bg-[var(--mango)] text-white font-bold px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_var(--black)] transition-all flex items-center gap-2">
            <RefreshCw size={18} /> New Set
          </button>
        </div>
        {/* Hinglish Wisdom */}
        <div className="mt-6 bg-white p-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_var(--black)] max-w-sm text-center">
          <Sparkles size={20} className="text-[var(--mango)] mx-auto mb-2" />
          <p className="text-sm font-medium italic text-gray-700">
            {isGreat
              ? '"Maths ka hero woh nahi jo sab jaanta hai, woh hai jo kabhi haarna nahi maanta!" — MathsGuru Bhaiya'
              : '"Girte hain sheh sawaar hi, maidan-e-jung mein — jo thakte nahi, woh jeet-te hain!" — MathsGuru Bhaiya'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-headline font-bold text-[var(--mango)] flex items-center justify-center gap-2">
          <Trophy size={22} /> Panga Zone! 🎯
        </h2>
        <p className="text-xs text-gray-500 mt-1">Question {currentIndex + 1} of {totalQuestions} • Score: {score}/{totalQuestions}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 border border-black">
        <div className="h-full bg-[var(--mango)] rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} />
      </div>

      {/* Question Card */}
      <div className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_var(--black)] mb-4">
        <h3 className="font-bold text-base mb-4">{current.question}</h3>
        <div className="space-y-2">
          {current.options.map((opt, i) => {
            let bg = 'bg-white hover:bg-gray-50';
            if (showResult) {
              if (i === current.correct) bg = 'bg-green-100 border-green-500';
              else if (i === selectedAnswer) bg = 'bg-red-100 border-red-500';
            } else if (selectedAnswer === i) {
              bg = 'bg-[var(--yellow-light)] border-[var(--mango)]';
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                className={`w-full text-left p-3 rounded-lg border-2 border-black transition-all ${bg}`}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[var(--mango)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm font-medium">{opt}</span>
                  {showResult && i === current.correct && <CheckCircle2 size={18} className="text-green-500 ml-auto" />}
                  {showResult && i === selectedAnswer && i !== current.correct && <XCircle size={18} className="text-red-500 ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      {!showResult && (
        <button onClick={() => setShowHint(true)} className="text-xs text-[var(--mango)] underline mb-4 flex items-center gap-1">
          <Lightbulb size={14} /> Hint de do Bhaiya
        </button>
      )}
      {showHint && !showResult && (
        <div className="bg-[var(--yellow-light)] p-3 rounded-lg border border-black text-sm mb-4 flex items-start gap-2">
          <Lightbulb size={16} className="text-[var(--mango)] shrink-0 mt-0.5" />
          <span>{current.hint}</span>
        </div>
      )}

      {/* Result feedback */}
      {showResult && (
        <div className={`p-3 rounded-lg border-2 border-black mb-4 text-sm ${
          selectedAnswer === current.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <span className="font-bold">{selectedAnswer === current.correct ? '✅ Sahi Jawab! +10 XP' : '❌ Galat!'}</span>
          <span className="ml-2">{current.hint}</span>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button onClick={handleNext}
          className="w-full bg-[var(--mango)] text-white font-bold py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_var(--black)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_var(--black)] transition-all flex items-center justify-center gap-2">
          {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
          <ArrowRight size={18} />
        </button>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {questions.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full border-2 border-black ${
            i === currentIndex ? 'bg-[var(--mango)]' :
            answered[i] ? 'bg-green-400' :
            answered[i] === false ? 'bg-red-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>
    </div>
  );
}
