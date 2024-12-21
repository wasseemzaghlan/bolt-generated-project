import { Question } from '@/types/exam';

export const ethicsQuestions: Question[] = [
  {
    id: "q36",
    type: "multiple-choice",
    text: "What is the primary ethical consideration in memory-altering magic?",
    image: {
      url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
      alt: "Memory magic"
    },
    hasFileUpload: true,
    correctAnswer: "Informed consent",
    points: 20,
    options: [
      "Spell efficiency",
      "Informed consent",
      "Duration of effect",
      "Magical power required"
    ]
  },
  {
    id: "q37",
    type: "descriptive",
    text: "Discuss the ethical implications of using magic for environmental manipulation.",
    image: {
      url: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format&fit=crop&q=80",
      alt: "Environmental magic"
    },
    hasFileUpload: true,
    points: 25
  },
  {
    id: "q38",
    type: "true-false",
    text: "The end result justifies any means in magical research.",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Research ethics"
    },
    hasFileUpload: true,
    correctAnswer: false,
    points: 15
  },
  {
    id: "q39",
    type: "multiple-choice",
    text: "Which approach best addresses ethical concerns in magical experimentation?",
    image: {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      alt: "Ethical experimentation"
    },
    hasFileUpload: true,
    correctAnswer: "Transparent methodology with oversight",
    points: 20,
    options: [
      "Secretive research",
      "Transparent methodology with oversight",
      "Minimal documentation",
      "Individual discretion"
    ]
  },
  {
    id: "q40",
    type: "descriptive",
    text: "Evaluate the ethical responsibilities of magical practitioners in sharing knowledge with non-magical communities.",
    image: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      alt: "Knowledge sharing"
    },
    hasFileUpload: true,
    points: 25
  }
];
