import { Question } from '@/types/exam';

export const masteryQuestions: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    text: "Which advanced magical principle is essential for achieving mastery in spell creation?",
    image: {
      url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80",
      alt: "Spell creation mastery"
    },
    hasFileUpload: true,
    correctAnswer: "Energy Synthesis",
    points: 30,
    options: [
      "Energy Synthesis",
      "Power Maximization",
      "Element Isolation",
      "Force Amplification"
    ]
  },
  {
    id: "q2",
    type: "descriptive",
    text: "Explain how the principles of magical resonance can be applied to create permanent enchantments without degradation.",
    image: {
      url: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=800&auto=format&fit=crop&q=80",
      alt: "Permanent enchantments"
    },
    hasFileUpload: true,
    points: 35
  },
  {
    id: "q3",
    type: "true-false",
    text: "Master-level spells always require more magical energy than their standard counterparts.",
    image: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      alt: "Spell energy efficiency"
    },
    hasFileUpload: true,
    correctAnswer: false,
    points: 25
  },
  {
    id: "q4",
    type: "multiple-choice",
    text: "What distinguishes a master wizard's approach to spell modification?",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Spell modification mastery"
    },
    hasFileUpload: true,
    correctAnswer: "Understanding core magical principles",
    points: 30,
    options: [
      "Raw power application",
      "Understanding core magical principles",
      "Complex incantations",
      "Rare ingredient usage"
    ]
  },
  {
    id: "q5",
    type: "descriptive",
    text: "Analyze the relationship between magical theory and practical application in achieving mastery of transmutation spells.",
    image: {
      url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
      alt: "Transmutation mastery"
    },
    hasFileUpload: true,
    points: 35
  }
];
