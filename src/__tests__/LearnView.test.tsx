import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LearnView } from '../components/LearnView';
import type { UserStats, DifficultyLevel } from '../types';
import { TOPICS } from '../data';

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

describe('LearnView', () => {
  const defaultProps = {
    stats: makeStats(),
    onViewScreen: vi.fn(),
    onCompleteScreen: vi.fn(),
    onAddXP: vi.fn(),
    difficulty: 'beginner' as DifficultyLevel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders topic list initially', () => {
    render(<LearnView {...defaultProps} />);
    expect(screen.getByText(/Padho/)).toBeInTheDocument();
    TOPICS.forEach(t => {
      expect(screen.getByText(t.name)).toBeInTheDocument();
    });
  });

  it('shows subtopics after selecting a topic', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    TOPICS[0].subtopics.forEach(sub => {
      expect(screen.getByText(sub.name)).toBeInTheDocument();
    });
  });

  it('navigates back to topic list', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(/Back to Topics/));
    expect(screen.getByText(/Padho/)).toBeInTheDocument();
  });

  it('accepts score postMessage with valid data', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: JSON.stringify({ type: 'score', score: 15 }),
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).toHaveBeenCalledWith(15);
  });

  it('ignores postMessage with wrong type', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: JSON.stringify({ type: 'other', score: 15 }),
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).not.toHaveBeenCalled();
  });

  it('ignores postMessage with non-number score', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: JSON.stringify({ type: 'score', score: 'not-a-number' }),
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).not.toHaveBeenCalled();
  });

  it('ignores postMessage with missing score field', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: JSON.stringify({ type: 'score' }),
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).not.toHaveBeenCalled();
  });

  it('handles non-string postMessage data (object form)', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: { type: 'score', score: 20 },
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).toHaveBeenCalledWith(20);
  });

  it('ignores malformed postMessage data', () => {
    render(<LearnView {...defaultProps} />);
    const event = new MessageEvent('message', {
      data: 'not json at all {{{',
    });
    window.dispatchEvent(event);
    expect(defaultProps.onAddXP).not.toHaveBeenCalled();
  });

  it('shows topic progress percentage', () => {
    const stats = makeStats({
      completedScreens: new Set([TOPICS[0].subtopics[0].screens[0].id]),
    });
    render(<LearnView {...defaultProps} stats={stats} />);
    expect(screen.getByText(TOPICS[0].name)).toBeInTheDocument();
  });

  it('navigates into screen viewer and shows breadcrumb', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    expect(screen.getByText(TOPICS[0].name)).toBeInTheDocument();
    expect(screen.getByText(TOPICS[0].subtopics[0].name)).toBeInTheDocument();
  });

  it('shows navigation buttons in screen viewer', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows Done button for uncompleted screens', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    expect(screen.getByText('Done!')).toBeInTheDocument();
  });

  it('calls onCompleteScreen and onAddXP when Done is clicked', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    fireEvent.click(screen.getByText('Done!'));
    expect(defaultProps.onCompleteScreen).toHaveBeenCalled();
    expect(defaultProps.onAddXP).toHaveBeenCalledWith(5);
  });

  it('disables Prev button on first screen', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    const prevBtn = screen.getByText('Prev').closest('button')!;
    expect(prevBtn).toBeDisabled();
  });

  it('navigates to next screen', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    const nextBtn = screen.getByText('Next').closest('button')!;
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\d+\/\d+/)).toBeInTheDocument();
  });

  it('hides Done button when screen is already completed', () => {
    const screenId = TOPICS[0].subtopics[0].screens[0].id;
    const stats = makeStats({
      completedScreens: new Set([screenId]),
    });
    render(<LearnView {...defaultProps} stats={stats} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    expect(screen.queryByText('Done!')).not.toBeInTheDocument();
  });

  it('navigates back to subtopic list from breadcrumb', () => {
    render(<LearnView {...defaultProps} />);
    fireEvent.click(screen.getByText(TOPICS[0].name));
    fireEvent.click(screen.getByText(TOPICS[0].subtopics[0].name));
    const breadcrumbButtons = screen.getAllByText(TOPICS[0].subtopics[0].name);
    fireEvent.click(breadcrumbButtons[0]);
    expect(screen.getByText(TOPICS[0].name)).toBeInTheDocument();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
