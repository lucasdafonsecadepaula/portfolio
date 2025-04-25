export interface FlashCard {
    id: string
    type: "multiple-choice" | "ai-code" | "keyword"
    difficulty: "easy" | "intermediate" | "hard"
    question: string
    options?: string[]
    correctAnswer?: string
    explanation?: string
    keywords?: string[]
  }
  