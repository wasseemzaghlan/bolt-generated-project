import { ExamData } from '@/types/exam';
import { masteryQuestions } from './questions/mastery';
import { practicalQuestions } from './questions/practical';
import { advancedQuestions } from './questions/advanced';
import { specializedQuestions } from './questions/specialized';
import { researchQuestions } from './questions/research';
import { safetyQuestions } from './questions/safety';
import { ethicsQuestions } from './questions/ethics';

// Combine all questions for static generation
export const allQuestions = [
  ...masteryQuestions,
  ...practicalQuestions,
  ...advancedQuestions,
  ...specializedQuestions,
  ...researchQuestions,
  ...safetyQuestions,
  ...ethicsQuestions
];

export const sampleExam: ExamData = {
  title: "Advanced Wizardry Certification",
  description: "Comprehensive assessment of magical theory and practical applications",
  questions: masteryQuestions
};
