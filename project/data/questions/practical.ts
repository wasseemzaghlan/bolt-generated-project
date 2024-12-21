import { Question } from '@/types/exam';

export const practicalQuestions: Question[] = [
  {
    id: "q6",
    type: "multiple-choice",
    text: "Which wand movement is most effective for elemental transmutation spells?",
    image: {
      url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&auto=format&fit=crop&q=80",
      alt: "Wand movements demonstration"
    },
    hasFileUpload: true,
    correctAnswer: "Spiral with clockwise finish",
    points: 10,
    options: [
      "Linear thrust",
      "Spiral with clockwise finish",
      "Figure-eight pattern",
      "Counter-clockwise circle"
    ]
  },
  {
    id: "q7",
    type: "descriptive",
    text: "Describe the proper technique for stabilizing a volatile potion during the crystallization phase.",
    image: {
      url: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=800&auto=format&fit=crop&q=80",
      alt: "Potion stabilization process"
    },
    hasFileUpload: true,
    points: 15
  },
  {
    id: "q8",
    type: "true-false",
    text: "Counter-clockwise stirring always reverses the effects of clockwise stirring in potion-making.",
    image: {
      url: "https://images.unsplash.com/photo-1596631279838-5bdb898a8d50?w=800&auto=format&fit=crop&q=80",
      alt: "Potion stirring techniques"
    },
    hasFileUpload: true,
    correctAnswer: false,
    points: 5
  },
  {
    id: "q9",
    type: "multiple-choice",
    text: "What is the most crucial factor in successful apparition?",
    image: {
      url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80",
      alt: "Apparition demonstration"
    },
    hasFileUpload: true,
    correctAnswer: "Clear destination visualization",
    points: 10,
    options: [
      "Physical strength",
      "Clear destination visualization",
      "Wand quality",
      "Weather conditions"
    ]
  },
  {
    id: "q10",
    type: "descriptive",
    text: "Explain the process of creating a stable magical barrier, including energy distribution and anchor points.",
    image: {
      url: "https://images.unsplash.com/photo-1519419166318-4f5c601b8e96?w=800&auto=format&fit=crop&q=80",
      alt: "Magical barrier creation"
    },
    hasFileUpload: true,
    points: 15
  }
];
