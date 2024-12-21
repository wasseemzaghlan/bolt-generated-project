import { Question } from '@/types/exam';

export const innovationQuestions: Question[] = [
  {
    id: "q26",
    type: "multiple-choice",
    text: "What is the most promising approach for developing new spell variants?",
    image: {
      url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80",
      alt: "Spell development"
    },
    hasFileUpload: true,
    correctAnswer: "Hybrid technique adaptation",
    points: 20,
    options: [
      "Traditional modification",
      "Hybrid technique adaptation",
      "Complete reinvention",
      "Historical recreation"
    ]
  },
  {
    id: "q27",
    type: "descriptive",
    text: "Propose an innovative solution for enhancing magical energy efficiency in long-duration spells.",
    image: {
      url: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format&fit=crop&q=80",
      alt: "Energy efficiency"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q28",
    type: "true-false",
    text: "Modern technological principles can be successfully integrated with traditional magic.",
    image: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      alt: "Magic and technology"
    },
    hasFileUpload: true,
    correctAnswer: true,
    points: 15
  },
  {
    id: "q29",
    type: "multiple-choice",
    text: "Which factor is most crucial for successful magical innovation?",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Magical innovation"
    },
    hasFileUpload: true,
    correctAnswer: "Understanding fundamental principles",
    points: 20,
    options: [
      "Creative thinking",
      "Understanding fundamental principles",
      "Advanced equipment",
      "Historical knowledge"
    ]
  },
  {
    id: "q30",
    type: "descriptive",
    text: "Design a new approach to combining elemental magic with modern sustainable energy concepts.",
    image: {
      url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
      alt: "Sustainable magic"
    },
    hasFileUpload: true,
    points: 25
  }
];
