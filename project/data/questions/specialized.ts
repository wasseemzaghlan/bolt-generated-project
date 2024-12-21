import { Question } from '@/types/exam';

export const specializedQuestions: Question[] = [
  {
    id: "q16",
    type: "multiple-choice",
    text: "Which method is most effective for containing magical artifacts with temporal properties?",
    image: {
      url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
      alt: "Artifact containment"
    },
    hasFileUpload: true,
    correctAnswer: "Temporal stasis field",
    points: 20,
    options: [
      "Physical barriers",
      "Temporal stasis field",
      "Energy dampening",
      "Spatial isolation"
    ]
  },
  {
    id: "q17",
    type: "descriptive",
    text: "Describe the process of creating and maintaining a stable portal between parallel magical dimensions.",
    image: {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
      alt: "Dimensional portal"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q18",
    type: "true-false",
    text: "Elemental affinity affects the stability of trans-dimensional portals.",
    image: {
      url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
      alt: "Elemental magic"
    },
    hasFileUpload: true,
    correctAnswer: true,
    points: 15
  },
  {
    id: "q19",
    type: "multiple-choice",
    text: "What is the most critical factor in successful magical artifact restoration?",
    image: {
      url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=80",
      alt: "Artifact restoration"
    },
    hasFileUpload: true,
    correctAnswer: "Original magical signature preservation",
    points: 20,
    options: [
      "Physical reconstruction",
      "Original magical signature preservation",
      "Modern enchantment application",
      "Historical documentation"
    ]
  },
  {
    id: "q20",
    type: "descriptive",
    text: "Analyze the implications of using time-turner technology in combination with space-expansion charms.",
    image: {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
      alt: "Time-turner mechanics"
    },
    hasFileUpload: true,
    points: 25
  }
];
