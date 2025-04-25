"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { FlashCard } from "@/types/flash-card"
import { CheckCircle, XCircle } from "lucide-react"

interface MultipleChoiceCardProps {
  card: FlashCard
  onAnswer: (correct: boolean) => void
  answered: boolean
  isCorrect: boolean
}

export default function MultipleChoiceCard({ card, onAnswer, answered, isCorrect }: MultipleChoiceCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (value: string) => {
    if (!answered) {
      setSelectedOption(value)
    }
  }

  const handleSubmit = () => {
    if (selectedOption === null) return

    const correct = selectedOption === card.correctAnswer
    onAnswer(correct)
  }

  const getOptionClass = (option: string) => {
    if (!answered) return ""

    if (option === card.correctAnswer) {
      return "bg-green-100 border-green-500"
    }

    if (option === selectedOption && option !== card.correctAnswer) {
      return "bg-red-100 border-red-500"
    }

    return ""
  }

  return (
    <Card className="shadow-lg border-2">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="text-sm uppercase font-semibold text-gray-500 mb-2">Multiple Choice Question</div>
          <h2 className="text-xl font-bold mb-4">{card.question}</h2>

          <RadioGroup value={selectedOption || ""} className="space-y-3">
            {card.options?.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-colors ${getOptionClass(option)}`}
                onClick={() => handleOptionSelect(option)}
              >
                <RadioGroupItem value={option} id={`option-${index}`} disabled={answered} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {answered && (
          <div className={`p-4 rounded-md mb-4 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
            <div className="flex items-center">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className="font-medium">{isCorrect ? "Correct!" : "Incorrect!"}</span>
            </div>
            <p className="mt-2">{card.explanation}</p>
          </div>
        )}

        {!answered && (
          <Button onClick={handleSubmit} disabled={selectedOption === null} className="w-full">
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
