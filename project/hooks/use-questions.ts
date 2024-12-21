"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question } from '@/types/exam';
import { allQuestions } from '@/data/sample-exam';

interface QuestionsStore {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => void;
}

export const useQuestions = create<QuestionsStore>()(
  persist(
    (set) => ({
      questions: allQuestions,
      addQuestion: async (question) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set((state) => ({
          questions: [
            ...state.questions,
            { ...question, id: `question_${Date.now()}` } as Question,
          ],
        }));
      },
      updateQuestion: async (id, question) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...question } : q
          ),
        }));
      },
      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
    }),
    {
      name: 'questions-storage',
    }
  )
);
