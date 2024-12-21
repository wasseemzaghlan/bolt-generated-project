import { Question } from '@/types/exam';

export const researchQuestions: Question[] = [
  {
    id: "q21",
    type: "multiple-choice",
    text: "Which research methodology is most appropriate for studying volatile magical phenomena?",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Magical research"
    },
    hasFileUpload: true,
    correctAnswer: "Controlled environment observation",
    points: 20,
    options: [
      "Direct manipulation",
      "Controlled environment observation",
      "Theoretical modeling",
      "Historical analysis"
    ]
  },
  {
    id: "q22",
    type: "descriptive",
    text: "Explain the ethical considerations in magical experimentation with consciousness-altering spells.",
    image: {
      url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
      alt: "Magical ethics"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q23",
    type: "true-false",
    text: "The Observer Effect significantly impacts magical research outcomes.",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Research methodology"
    },
    hasFileUpload: true,
    correctAnswer: true,
    points: 15
  },
  {
    id: "q24",
    type: "multiple-choice",
    text: "What is the primary challenge in researching ancient magical artifacts?",
    image: {
      url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=80",
      alt: "Ancient artifacts"
    },
    hasFileUpload: true,
    correctAnswer: "Preserving original enchantments during analysis",
    points: 20,
    options: [
      "Physical degradation",
      "Preserving original enchantments during analysis",
      "Documentation availability",
      "Modern compatibility"
    ]
  },
  {
    id: "q25",
    type: "descriptive",
    text: "Discuss the implications of quantum magical theory on traditional spellcasting research.",
    image: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      alt: "Quantum magic"
    },
    hasFileUpload: true,
    points: 25
  }
];
