"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import MultipleChoiceCard from "@/components/flash-cards/multiple-choice-card"
import AIResponseCard from "@/components/flash-cards/ai-response-card"
import { getFlashCards } from "@/lib/flash-cards"
import type { FlashCard } from "@/types/flash-card"

export default function StudyPage() {
  const router = useRouter()
  const { topic } = useParams() as { topic: string }
  const [cards, setCards] = useState<FlashCard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [progress, setProgress] = useState(0)
  const [studyParams, setStudyParams] = useState({
    count: 5,
    difficulty: "easy",
  })

  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(window.location.search)
    const count = Number.parseInt(searchParams.get("count") || "5", 10)
    const difficulty = searchParams.get("difficulty") || "easy"

    setStudyParams({ count, difficulty })

    // Get flash cards based on topic and filter by difficulty
    let flashCards = getFlashCards(topic)

    // Filter by difficulty (in a real app, cards would have difficulty property)
    // For this demo, we'll simulate filtering
    if (topic !== "all") {
      flashCards = flashCards.filter((_, index) => {
        if (difficulty === "easy") return index < count
        if (difficulty === "intermediate") return index >= 1 && index < count + 1
        return index >= 2 && index < count + 2
      })
    } else {
      // For "all" topic, get some cards from each category
      const allCards: FlashCard[] = []
      const categories = ["frontend", "backend", "cs-fundamentals", "ui&ux-design"]

      categories.forEach((category) => {
        const categoryCards = getFlashCards(category)
        // Get cards from each category based on difficulty and count
        const startIndex = difficulty === "easy" ? 0 : difficulty === "intermediate" ? 1 : 2
        const cardsToAdd = categoryCards.slice(startIndex, startIndex + Math.ceil(count / categories.length))
        allCards.push(...cardsToAdd)
      })

      flashCards = allCards
    }

    // Limit to requested count
    flashCards = flashCards.slice(0, count)

    if (flashCards.length === 0) {
      router.push("/")
      return
    }

    setCards(flashCards)
  }, [topic, router])

  const currentCard = cards[currentCardIndex]

  const handleAnswer = (correct: boolean) => {
    setAnswered(true)
    setIsCorrect(correct)
  }

  const goToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setAnswered(false)
      setProgress(((currentCardIndex + 1) / cards.length) * 100)
    } else {
      // All cards completed
      setProgress(100)
    }
  }

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setAnswered(false)
      setProgress((currentCardIndex / cards.length) * 100)
    }
  }

  const resetStudy = () => {
    setCurrentCardIndex(0)
    setAnswered(false)
    setProgress(0)
  }

  if (cards.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const topicTitle =
    {
      frontend: "Frontend Development",
      backend: "Backend Development",
      "cs-fundamentals": "Algorithms & Data Structures",
      "ui&ux-design": "UI/UX Design",
      all: "All Topics",
    }[topic] || topic

  return (
    <main className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
        </Button>
        <h1 className="text-3xl font-bold">{topicTitle}</h1>
        <div className="flex flex-wrap gap-2 mt-1 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {studyParams.count} Questions
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium capitalize">
            {studyParams.difficulty} Difficulty
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>
              {currentCardIndex + 1} of {cards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="mb-8">
        {currentCard.type === "multiple-choice" ? (
          <MultipleChoiceCard card={currentCard} onAnswer={handleAnswer} answered={answered} isCorrect={isCorrect} />
        ) : (
          <AIResponseCard card={currentCard} onAnswer={handleAnswer} answered={answered} isCorrect={isCorrect} />
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousCard} disabled={currentCardIndex === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <Button variant="outline" onClick={resetStudy}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>

        <Button onClick={goToNextCard} disabled={!answered && progress < 100}>
          {progress === 100 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
