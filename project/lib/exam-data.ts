"use client";

import { ExamInfo } from "@/types/calendar";

export const programs = [
  "Arcane Studies",
  "Potions Mastery",
  "Defense Arts",
  "Magical Theory",
  "Herbology"
] as const;

export const providers = [
  "Magical Academy",
  "Wizarding Institute",
  "Sorcery School",
  "Enchantment College"
] as const;

export const subjects = {
  "Arcane Studies": [
    "Advanced Spellcasting",
    "Magical Theory",
    "Ritual Magic",
    "Energy Manipulation"
  ],
  "Potions Mastery": [
    "Advanced Brewing",
    "Ingredient Studies",
    "Alchemical Theory",
    "Magical Compounds"
  ],
  "Defense Arts": [
    "Protective Spells",
    "Counter-Curses",
    "Magical Combat",
    "Shield Theory"
  ],
  "Magical Theory": [
    "Magical Physics",
    "Spell Creation",
    "Magical History",
    "Theoretical Studies"
  ],
  "Herbology": [
    "Magical Plants",
    "Growing Techniques",
    "Plant Properties",
    "Greenhouse Management"
  ]
} as const;

export const chapters = {
  "Advanced Spellcasting": [
    "Fundamental Principles",
    "Advanced Techniques",
    "Power Management",
    "Spell Combinations"
  ],
  "Magical Theory": [
    "Basic Concepts",
    "Advanced Theory",
    "Practical Applications",
    "Research Methods"
  ]
} as const;

export const topics = {
  "Fundamental Principles": [
    "Energy Flow",
    "Magical Resonance",
    "Core Mechanics",
    "Basic Patterns"
  ],
  "Advanced Techniques": [
    "Complex Patterns",
    "Energy Weaving",
    "Power Control",
    "Efficiency Methods"
  ]
} as const;

export const sampleExams: ExamInfo[] = [
  {
    id: "exam_1",
    title: "Advanced Wizardry Certification",
    program: "Arcane Studies",
    provider: "Magical Academy",
    subject: "Advanced Spellcasting",
    chapter: "Fundamental Principles",
    topic: "Energy Flow",
    year: 2024
  },
  {
    id: "exam_2",
    title: "Potions Master Qualification",
    program: "Potions Mastery",
    provider: "Wizarding Institute",
    subject: "Advanced Brewing",
    year: 2024
  },
  {
    id: "exam_3",
    title: "Defense Against Dark Arts",
    program: "Defense Arts",
    provider: "Sorcery School",
    subject: "Protective Spells",
    year: 2024
  }
];

export function getExamsByProgram(program: string): ExamInfo[] {
  return sampleExams.filter(exam => exam.program === program);
}

export function getSubjectsByProgram(program: string): string[] {
  return subjects[program as keyof typeof subjects] || [];
}

export function getChaptersBySubject(subject: string): string[] {
  return chapters[subject as keyof typeof chapters] || [];
}

export function getTopicsByChapter(chapter: string): string[] {
  return topics[chapter as keyof typeof topics] || [];
}
