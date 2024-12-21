import { Question } from '@/types/exam';

export const theoryQuestions: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    text: "What is the fundamental principle behind magical energy conservation?",
    image: {
      url: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format&fit=crop&q=80",
      alt: "Magical energy visualization"
    },
    hasFileUpload: true,
    correctAnswer: "Energy cannot be created or destroyed, only transformed",
    points: 10,
    options: [
      "Energy cannot be created or destroyed, only transformed",
      "Energy can be created from nothing",
      "Energy naturally dissipates over time",
      "Energy is constant regardless of use"
    ]
  },
  {
    id: "q2",
    type: "descriptive",
    text: "Explain the relationship between magical resonance and spell amplification. Provide specific examples.",
    image: {
      url: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=800&auto=format&fit=crop&q=80",
      alt: "Magical resonance patterns"
    },
    hasFileUpload: true,
    points: 15
  },
  {
    id: "q3",
    type: "true-false",
    text: "Magical resonance frequencies are always constant across different magical traditions.",
    image: {
      url: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800&auto=format&fit=crop&q=80",
      alt: "Magical traditions comparison"
    },
    hasFileUpload: true,
    correctAnswer: false,
    points: 5
  },
  {
    id: "q4",
    type: "multiple-choice",
    text: "Which theory best explains the phenomenon of magical interference patterns?",
    image: {
      url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
      alt: "Magical interference patterns"
    },
    hasFileUpload: true,
    correctAnswer: "Wave Convergence Theory",
    points: 10,
    options: [
      "Particle Theory",
      "Wave Convergence Theory",
      "Quantum Entanglement",
      "Linear Progression"
    ]
  },
  {
    id: "q5",
    type: "descriptive",
    text: "Analyze the role of intention in spell casting and its impact on magical efficacy.",
    image: {
      url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
      alt: "Spell casting visualization"
    },
    hasFileUpload: true,
    points: 15
  }
];
