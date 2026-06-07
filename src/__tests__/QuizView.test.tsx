import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizView } from '../components/QuizView';
import { QUIZ_QUESTIONS } from '../data';
import type { UserStats, DifficultyLevel } from '../types';

function makeStats(overrides?: Partial<UserStats>): UserStats {
  return {
    xp: 0,
    streak: 0,
    lastActiveDate: '',
    screensViewed: new Set(),
    completedScreens: new Set(),
    badges: [],
    quizScores: {},
    ...overrides,
  };
}

describe('QuizView', () => {
  const defaultProps = {
    stats: makeStats(),
    onAddXP: vi.fn(),
    onCompleteQuiz: vi.fn(),
    difficulty: 'beginner' as DifficultyLevel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  it('renders the quiz header', () => {
    render(<QuizView {...defaultProps} />);
    expect(screen.getByText(/Panga Zone/)).toBeInTheDocument();
  });

  it('displays the first question', () => {
    render(<QuizView {...defaultProps} />);
    expect(screen.getByText(/Question 1 of/)).toBeInTheDocument();
  });

  it('renders 5 shuffled questions from the pool', () => {
    render(<QuizView {...defaultProps} />);
    expect(screen.getByText(/Question 1 of 5/)).toBeInTheDocument();
  });

  it('shows hint button and reveals hint on click', () => {
    render(<QuizView {...defaultProps} />);
    const hintBtn = screen.getByText(/Hint de do Bhaiya/);
    fireEvent.click(hintBtn);
    const current = QUIZ_QUESTIONS[0];
    expect(screen.getByText(current.hint)).toBeInTheDocument();
  });

  it('awards XP on correct answer', () => {
    render(<QuizView {...defaultProps} />);
    const current = QUIZ_QUESTIONS[0];
    const correctOption = screen.getByText(current.options[current.correct]);
    fireEvent.click(correctOption);
    expect(defaultProps.onAddXP).toHaveBeenCalledWith(10);
  });

  it('does not award XP on wrong answer', () => {
    render(<QuizView {...defaultProps} />);
    const current = QUIZ_QUESTIONS[0];
    const wrongIdx = current.correct === 0 ? 1 : 0;
    fireEvent.click(screen.getByText(current.options[wrongIdx]));
    expect(defaultProps.onAddXP).not.toHaveBeenCalled();
  });

  it('advances to next question after answering', () => {
    render(<QuizView {...defaultProps} />);
    const current = QUIZ_QUESTIONS[0];
    fireEvent.click(screen.getByText(current.options[current.correct]));
    const nextBtn = screen.getByText('Next Question');
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Question 2 of/)).toBeInTheDocument();
  });

  it('completes quiz after answering all 5 questions', () => {
    render(<QuizView {...defaultProps} />);
    for (let i = 0; i < 5; i++) {
      const current = QUIZ_QUESTIONS[i];
      fireEvent.click(screen.getByText(current.options[current.correct]));
      if (i < 4) {
        fireEvent.click(screen.getByText('Next Question'));
      } else {
        fireEvent.click(screen.getByText('See Results'));
      }
    }
    expect(defaultProps.onCompleteQuiz).toHaveBeenCalled();
    expect(screen.getByText(/New Set/)).toBeInTheDocument();
  });

  it('restart resets quiz and shuffles questions', () => {
    render(<QuizView {...defaultProps} />);
    for (let i = 0; i < 5; i++) {
      const q = QUIZ_QUESTIONS[i];
      fireEvent.click(screen.getByText(q.options[q.correct]));
      if (i < 4) {
        fireEvent.click(screen.getByText('Next Question'));
      } else {
        fireEvent.click(screen.getByText('See Results'));
      }
    }
    const newSetBtn = screen.getByText(/New Set/);
    fireEvent.click(newSetBtn);
    expect(screen.getByText(/Question 1 of 5/)).toBeInTheDocument();
  });
});
