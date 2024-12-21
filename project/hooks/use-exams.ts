"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exam } from '@/types/exam';

interface ExamsStore {
  exams: Exam[];
  addExam: (exam: Omit<Exam, 'id'>) => Promise<void>;
  updateExam: (id: string, exam: Partial<Exam>) => Promise<void>;
  deleteExam: (id: string) => void;
}

export const useExams = create<ExamsStore>()(
  persist(
    (set) => ({
      exams: [],
      addExam: async (exam) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set((state) => ({
          exams: [
            ...state.exams,
            { ...exam, id: `exam_${Date.now()}` } as Exam,
          ],
        }));
      },
      updateExam: async (id, exam) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set((state) => ({
          exams: state.exams.map((e) =>
            e.id === id ? { ...e, ...exam } : e
          ),
        }));
      },
      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'exams-storage',
    }
  )
);
