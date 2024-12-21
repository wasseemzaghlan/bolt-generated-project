"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  department: string;
  credits: number;
}

interface SubjectsStore {
  subjects: Subject[];
  isLoading: boolean;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
}

export const useSubjects = create<SubjectsStore>()(
  persist(
    (set) => ({
      subjects: [],
      isLoading: false,
      addSubject: (subject) =>
        set((state) => ({
          subjects: [
            ...state.subjects,
            { ...subject, id: `subject_${Date.now()}` },
          ],
        })),
      updateSubject: (id, subject) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === id ? { ...s, ...subject } : s
          ),
        })),
      deleteSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'subjects-storage',
    }
  )
);
