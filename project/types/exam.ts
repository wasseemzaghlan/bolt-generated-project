// Add to existing types

export interface Exam {
  id: string;
  title: string;
  description?: string;
  subject: string;
  program: string;
  provider: string;
  region?: string;
  chapter?: string;
  topic?: string;
  reference?: string;
  year: number;
  duration: number;
  status: 'draft' | 'active' | 'archived';
  instructions?: string;
  attachment?: {
    name: string;
    url: string;
  };
  questions: Question[];
  category?: QuestionCategory;
  type?: QuestionType;
  createdAt: string;
  updatedAt: string;
}
