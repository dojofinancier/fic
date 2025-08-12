export interface User {
  id: string;
  email: string;
  name: string;
  hasAccess: boolean;
  accessExpiresAt?: Date;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapter: number;
}

export interface Quiz {
  id: string;
  title: string;
  chapter: number;
  type: 'quiz' | 'exam';
  questions: Question[];
  timeLimit?: number; // in minutes
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface StudyProgress {
  userId: string;
  completedChapters: number[];
  quizScores: Record<string, number>;
  totalStudyTime: number;
  lastActiveDate: Date;
}

export interface StudyNoteSection {
  title: string;
  points: string[];
}

export interface StudyNote {
  id: string;
  chapter: number;
  title: string;
  sections: StudyNoteSection[];
  pdfPath?: string | null;
}

export interface StudyPlanWeek {
  id: string;
  planId: string;
  weekNumber: number;
  chapters: string;
  focus?: string;
  hours?: string;
  tasks: string[];
}

export interface StudyPlan {
  id: string;
  weeks: 6 | 8 | 12;
  title: string;
  description?: string;
  totalHours?: string;
  dailyCommitment?: string;
  pdfPath?: string | null;
  schedule: StudyPlanWeek[];
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  errors: ImportError[];
  data?: Question[] | import('./flashcard').Flashcard[];
}

// Re-export flashcard types
export type { Flashcard } from './flashcard';

// Re-export payment types
export type { Coupon, Order, Payment, CartItem, CouponValidation } from './payment';