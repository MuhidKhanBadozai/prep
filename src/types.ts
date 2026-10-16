export type Category =
  | 'JavaScript'
  | 'React'
  | 'Next.js'
  | 'Node.js'
  | 'Express'
  | 'Express.js'
  | 'MongoDB'
  | 'GSAP'
  | 'System Design'
  | 'General & CS'
  | 'General & Pakistani Market';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type MasteryStatus = 'unread' | 'learning' | 'reviewing' | 'mastered';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  number: number;
  category: Category;
  question: string;
  answer: string;
  keyPoints?: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  difficulty: Difficulty;
  frequentlyAskedBy?: string[];
  quizOptions?: QuizOption[];
}

export interface TestAnswerRecord {
  questionId: string;
  userScore: number; // 0, 50, 100
  rating: 'correct' | 'partial' | 'missed';
  userNotes?: string;
  selectedOptionIndex?: number;
}

export interface TestResult {
  id: string;
  date: string;
  mode: 'flashcard' | 'quiz';
  categoryFilter: string;
  totalQuestions: number;
  scorePercentage: number;
  correctCount: number;
  partialCount: number;
  missedCount: number;
  durationSeconds: number;
  records: TestAnswerRecord[];
}

export interface UserProgress {
  statuses: Record<string, MasteryStatus>;
  bookmarks: string[];
  notes: Record<string, string>;
  testHistory: TestResult[];
}
