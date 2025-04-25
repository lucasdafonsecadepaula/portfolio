"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight, BookOpen, Hash, BarChart3 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [questionCount, setQuestionCount] = useState<string>("5")
  const [difficulty, setDifficulty] = useState<string>("easy")

  const topics = [
    {
      id: "frontend",
      title: "Frontend Development",
    },
    {
      id: "backend",
      title: "Backend Development",
    },
    {
      id: "cs-fundamentals",
      title: "Algorithms & Data Structures",
    },
    {
      id: "ui&ux-design",
      title: "UI/UX Design",
    },
    {
      id: "all",
      title: "All Topics",
    },
  ]

  const questionOptions = [
    { value: "5", label: "5 Questions" },
    { value: "15", label: "15 Questions" },
    { value: "30", label: "30 Questions" },
  ]

  const difficultyOptions = [
    { value: "easy", label: "Easy"},
    { value: "intermediate", label: "Intermediate" },
    { value: "hard", label: "Hard" },
  ]

  const handleStartStudy = () => {
    if (!selectedTopic) return

    router.push(`/flash-cards/${selectedTopic}?count=${questionCount}&difficulty=${difficulty}`)
  }

  return (
    <main className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Flash Card Study</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Customize your study session with the options below</p>
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Step 1: Choose Topic */}
        <section>
          <div className="flex items-center mb-4">
            <BookOpen className="mr-2 h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-semibold">Step 1: Choose a Topic</h2>
          </div>

          <RadioGroup
            value={selectedTopic || ""}
            onValueChange={setSelectedTopic}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {topics.map((topic) => (
              <div key={topic.id} className="flex items-center space-x-2">
                <RadioGroupItem value={topic.id} id={`topic-${topic.id}`} className="sr-only" />
                <Label
                  htmlFor={`topic-${topic.id}`}
                  className={`flex items-center justify-center w-full p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTopic === topic.id
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {topic.title}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        {/* Step 2: Number of Questions */}
        <section>
          <div className="flex items-center mb-4">
            <Hash className="mr-2 h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-semibold">Step 2: Number of Questions</h2>
          </div>

          <RadioGroup
            value={questionCount}
            onValueChange={setQuestionCount}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {questionOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`question-${option.value}`} className="sr-only" />
                <Label
                  htmlFor={`question-${option.value}`}
                  className={`flex items-center justify-center w-full p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    questionCount === option.value
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        {/* Step 3: Difficulty Level */}
        <section>
          <div className="flex items-center mb-4">
            <BarChart3 className="mr-2 h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-semibold">Step 3: Difficulty Level</h2>
          </div>

          <RadioGroup
            value={difficulty}
            onValueChange={setDifficulty}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {difficultyOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`difficulty-${option.value}`} className="sr-only" />
                <Label
                  htmlFor={`difficulty-${option.value}`}
                  className={`flex items-center justify-center w-full p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    difficulty === option.value
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        {/* Start Button */}
        <div className="pt-4">
          <Button onClick={handleStartStudy} disabled={!selectedTopic} className="w-full py-6 text-lg">
            Start Studying <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}
