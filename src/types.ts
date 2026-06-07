// MathsGuru AI - Type Definitions

export interface Screen {
  id: string;
  title: string;
  file: string;
  topic?: string;
  subtopic?: string;
}

export interface Subtopic {
  id: string;
  name: string;
  screens: Screen[];
}

export interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: number;
}

export interface StorySlide {
  id: number;
  emoji: string;
  title: string;
  narration: string;
  choices: { text: string; correct: boolean }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  screensViewed: Set<string>;
  completedScreens: Set<string>;
  badges: string[];
  quizScores: Record<string, { score: number; total: number }>;
}

export type DifficultyLevel = "beginner" | "intermediate" | "expert";
