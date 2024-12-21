import { Question } from '@/types/exam';

export const advancedQuestions: Question[] = [
  {
    id: "q11",
    type: "multiple-choice",
    text: "Which advanced principle is most important in time-manipulation spells?",
    image: {
      url: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop&q=80",
      alt: "Time manipulation concept"
    },
    hasFileUpload: true,
    correctAnswer: "Temporal Anchoring",
    points: 20,
    options: [
      "Temporal Anchoring",
      "Linear Progression",
      "Quantum Tunneling",
      "Spatial Distortion"
    ]
  },
  {
    id: "q12",
    type: "descriptive",
    text: "Analyze the relationship between dimensional folding and spatial manipulation in advanced transportation spells.",
    image: {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
      alt: "Dimensional manipulation"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q13",
    type: "true-false",
    text: "Quantum entanglement principles can be applied to enhance long-distance communication spells.",
    image: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      alt: "Magical communication"
    },
    hasFileUpload: true,
    correctAnswer: true,
    points: 15
  },
  {
    id: "q14",
    type: "multiple-choice",
    text: "What is the primary consideration when designing multi-layered ward schemes?",
    image: {
      url: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=800&auto=format&fit=crop&q=80",
      alt: "Ward scheme design"
    },
    hasFileUpload: true,
    correctAnswer: "Energy harmonization between layers",
    points: 20,
    options: [
      "Physical barrier strength",
      "Energy harmonization between layers",
      "Aesthetic appearance",
      "Implementation speed"
    ]
  },
  {
    id: "q15",
    type: "descriptive",
    text: "Explain the theory and application of chaos magic in controlled experimental settings.",
    image: {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
      alt: "Chaos magic experimentation"
    },
    hasFileUpload: true,
    points: 25
  }
];
