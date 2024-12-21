import { Question } from '@/types/exam';

export const safetyQuestions: Question[] = [
  {
    id: "q31",
    type: "multiple-choice",
    text: "What is the first priority when containing a magical accident?",
    image: {
      url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&auto=format&fit=crop&q=80",
      alt: "Magical safety"
    },
    hasFileUpload: true,
    correctAnswer: "Energy containment",
    points: 20,
    options: [
      "Documentation",
      "Energy containment",
      "Spell reversal",
      "Area evacuation"
    ]
  },
  {
    id: "q32",
    type: "descriptive",
    text: "Outline the essential components of a comprehensive magical safety protocol for experimental research.",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Safety protocols"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q33",
    type: "true-false",
    text: "All magical accidents can be reversed with the proper counterspell.",
    image: {
      url: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=800&auto=format&fit=crop&q=80",
      alt: "Spell reversal"
    },
    hasFileUpload: true,
    correctAnswer: false,
    points: 15
  },
  {
    id: "q34",
    type: "multiple-choice",
    text: "Which safety measure is most effective for preventing magical contamination?",
    image: {
      url: "https://images.unsplash.com/photo-1596631279838-5bdb898a8d50?w=800&auto=format&fit=crop&q=80",
      alt: "Contamination prevention"
    },
    hasFileUpload: true,
    correctAnswer: "Multi-layered containment fields",
    points: 20,
    options: [
      "Physical barriers",
      "Multi-layered containment fields",
      "Warning systems",
      "Regular inspections"
    ]
  },
  {
    id: "q35",
    type: "descriptive",
    text: "Analyze the risks and safeguards necessary when working with unstable magical compounds.",
    image: {
      url: "https://images.unsplash.com/photo-1596631279838-5bdb898a8d50?w=800&auto=format&fit=crop&q=80",
      alt: "Risk analysis"
    },
    hasFileUpload: true,
    points: 25
  }
];
