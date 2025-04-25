"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { FlashCard } from "@/types/flash-card"
import { CheckCircle, XCircle, Sparkles } from "lucide-react"

interface AIResponseCardProps {
  card: FlashCard
  onAnswer: (correct: boolean) => void
  answered: boolean
  isCorrect: boolean
}

export default function AIResponseCard({ card, onAnswer, answered, isCorrect }: AIResponseCardProps) {
  const [response, setResponse] = useState("")
  const [aiEvaluation, setAiEvaluation] = useState("")

  const handleSubmit = () => {
    if (response.trim() === "") return

    // In a real app, this would call an AI model to evaluate the response
    // For this demo, we'll use a simple keyword matching approach
    const keywords = card.keywords || []
    const responseWords = response.toLowerCase().split(/\s+/)

    // Check if the response contains at least half of the keywords
    const matchedKeywords = keywords.filter((keyword) =>
      responseWords.some((word) => word.includes(keyword.toLowerCase())),
    )

    const percentageMatched = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0
    const correct = percentageMatched >= 0.5

    // Generate AI feedback
    let feedback = ""
    if (correct) {
      feedback = "Good job! Your answer covers the key points. " + card.explanation
    } else {
      feedback = `Your answer could be improved. Consider including concepts like: ${keywords.join(", ")}. ${card.explanation}`
    }

    setAiEvaluation(feedback)
    onAnswer(correct)
  }

  return (
    <Card className="shadow-lg border-2">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="text-sm uppercase font-semibold text-gray-500 mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-1" /> AI-Evaluated Question
          </div>
          <h2 className="text-xl font-bold mb-4">{card.question}</h2>

          <Textarea
            placeholder="Type your answer here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[150px] mb-4"
            disabled={answered}
          />
        </div>

        {answered && (
          <div className={`p-4 rounded-md mb-4 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
            <div className="flex items-center">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className="font-medium">{isCorrect ? "Good Answer!" : "Needs Improvement"}</span>
            </div>
            <p className="mt-2">{aiEvaluation}</p>
          </div>
        )}

        {!answered && (
          <Button onClick={handleSubmit} disabled={response.trim() === ""} className="w-full">
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
