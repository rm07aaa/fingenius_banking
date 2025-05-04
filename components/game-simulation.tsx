"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Smartphone, ShoppingCart, Wallet, Home, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Scenario = {
  id: string
  title: string
  description: string
  image: string
  icon: React.ElementType
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  questions: Question[]
}

type Question = {
  id: string
  text: string
  options: Option[]
  correctOptionId: string
  explanation: string
}

type Option = {
  id: string
  text: string
  consequence?: string
}

const scenarios: Scenario[] = [
  {
    id: "scenario1",
    title: "Smartphone Dilemma",
    description: "You want a new smartphone, but you have limited funds. What's your best option?",
    image: "/images/smartphone-dilemma.png",
    icon: Smartphone,
    difficulty: "Easy",
    category: "Spending",
    questions: [
      {
        id: "q1",
        text: "Your old smartphone is working but slow. You have $300 saved. What do you do?",
        options: [
          {
            id: "a",
            text: "Buy the latest $1000 model on a 24-month payment plan ($45/month)",
            consequence:
              "You'll pay $1080 total, $80 more than the phone's value, and be locked into payments for 2 years.",
          },
          {
            id: "b",
            text: "Buy a $300 mid-range phone with cash",
            consequence: "You stay within budget and avoid debt, though you don't get premium features.",
          },
          {
            id: "c",
            text: "Wait 3 more months while saving $100/month, then buy a $600 phone",
            consequence: "You get a better phone without debt by delaying gratification and saving more.",
          },
          {
            id: "d",
            text: "Buy a refurbished previous-generation premium phone for $400",
            consequence: "You stretch your budget slightly but get premium features at a discount.",
          },
        ],
        correctOptionId: "c",
        explanation:
          "Delaying gratification to save for a better phone avoids debt while getting better features than the budget option. This balances wants with financial responsibility.",
      },
    ],
  },
  {
    id: "scenario2",
    title: "Shopping Spree",
    description: "You received $200 as a gift. How will you spend it?",
    image: "/placeholder.svg?height=200&width=400",
    icon: ShoppingCart,
    difficulty: "Easy",
    category: "Budgeting",
    questions: [
      {
        id: "q1",
        text: "You just received $200 as a birthday gift. What's your plan?",
        options: [
          {
            id: "a",
            text: "Spend it all immediately on clothes and entertainment",
            consequence: "You enjoy immediate gratification but have nothing left for future needs or goals.",
          },
          {
            id: "b",
            text: "Save $100, spend $50 on something you need, and $50 on something you want",
            consequence: "You balance saving, needs, and wants - building good financial habits.",
          },
          {
            id: "c",
            text: "Save all $200 toward a future goal",
            consequence: "You maximize savings but miss the opportunity to enjoy some of the gift.",
          },
          {
            id: "d",
            text: "Invest all $200 in a stock that your friend recommended",
            consequence: "You take a high risk based on limited information, which could result in gains or losses.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The balanced approach teaches good money habits - saving for the future while meeting current needs and allowing for some enjoyment.",
      },
    ],
  },
  {
    id: "scenario3",
    title: "First Job Decisions",
    description: "You just got your first part-time job. How will you manage your income?",
    image: "/placeholder.svg?height=200&width=400",
    icon: Wallet,
    difficulty: "Medium",
    category: "Income",
    questions: [
      {
        id: "q1",
        text: "You're earning $150 weekly from your part-time job. What's your plan?",
        options: [
          {
            id: "a",
            text: "Spend it all each week - you earned it!",
            consequence: "You enjoy your money now but develop no saving habits and have nothing for future goals.",
          },
          {
            id: "b",
            text: "Save 20%, set aside 30% for college, and use 50% for expenses and fun",
            consequence: "You build savings, prepare for a major future expense, and have money for current needs.",
          },
          {
            id: "c",
            text: "Save 100% for a car and walk everywhere to avoid any expenses",
            consequence:
              "You reach your car goal faster but may be unrealistically strict, making it hard to maintain.",
          },
          {
            id: "d",
            text: "Give your parents all the money to manage for you",
            consequence: "You miss the opportunity to learn money management skills yourself.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "This balanced approach builds saving habits, prepares for major future expenses (college), and allows reasonable spending for current needs and enjoyment.",
      },
    ],
  },
  {
    id: "scenario4",
    title: "Housing Choices",
    description: "You're moving out on your own. What housing choice makes the most financial sense?",
    image: "/placeholder.svg?height=200&width=400",
    icon: Home,
    difficulty: "Hard",
    category: "Housing",
    questions: [
      {
        id: "q1",
        text: "You earn $3,000 monthly after taxes. What housing situation is most appropriate?",
        options: [
          {
            id: "a",
            text: "Rent a $1,500/month luxury apartment by yourself",
            consequence:
              "You spend 50% of your income on housing, leaving little for other expenses, savings, and goals.",
          },
          {
            id: "b",
            text: "Rent a $900/month apartment with a roommate ($1,800 total)",
            consequence: "You keep housing at 30% of your income, leaving room for other financial priorities.",
          },
          {
            id: "c",
            text: "Buy a $300,000 condo with a $1,800 monthly mortgage payment",
            consequence:
              "You build equity but spend 60% of income on housing and take on significant debt without emergency savings.",
          },
          {
            id: "d",
            text: "Live with parents for free while saving for a down payment",
            consequence: "You maximize savings but may delay independence and adult living skills.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Keeping housing costs around 30% of income is a standard financial guideline. This option balances affordability with independence.",
      },
    ],
  },
  {
    id: "scenario5",
    title: "Transportation Decisions",
    description: "You need transportation for school and work. What's your best option?",
    image: "/placeholder.svg?height=200&width=400",
    icon: Car,
    difficulty: "Medium",
    category: "Transportation",
    questions: [
      {
        id: "q1",
        text: "You need reliable transportation for school (5 miles away) and work (3 miles away). What's your best option with $3,000 saved?",
        options: [
          {
            id: "a",
            text: "Buy a new car for $25,000 with a 6-year loan ($400/month)",
            consequence:
              "You'll have reliable transportation but high monthly payments, insurance, and rapid depreciation.",
          },
          {
            id: "b",
            text: "Buy a reliable used car for $8,000, using your $3,000 as down payment",
            consequence:
              "You'll have lower payments, lower insurance, and less depreciation, but potentially more maintenance.",
          },
          {
            id: "c",
            text: "Buy a $2,500 car with cash and save $500 for potential repairs",
            consequence: "You avoid debt but may face reliability issues and higher maintenance costs.",
          },
          {
            id: "d",
            text: "Use public transportation ($80/month pass) and occasionally rideshare",
            consequence: "You save money and avoid car ownership costs but have less convenience and flexibility.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A reliable used car balances transportation needs with financial responsibility. The down payment reduces the loan amount, and you avoid the heavy depreciation of a new vehicle.",
      },
    ],
  },
]

export default function GameSimulation() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([])

  const currentQuestion = activeScenario.questions[currentQuestionIndex]

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    if (selectedOption === currentQuestion.correctOptionId) {
      setScore(score + 10)
    }

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowResult(false)

    if (currentQuestionIndex < activeScenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Scenario completed
      if (!completedScenarios.includes(activeScenario.id)) {
        setCompletedScenarios([...completedScenarios, activeScenario.id])
      }

      // Reset to first question for next scenario
      setCurrentQuestionIndex(0)
    }
  }

  const handleScenarioChange = (scenario: Scenario) => {
    setActiveScenario(scenario)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowResult(false)
  }

  const getSelectedOption = () => {
    if (!selectedOption) return null
    return currentQuestion.options.find((option) => option.id === selectedOption)
  }

  const isScenarioCompleted = (scenarioId: string) => {
    return completedScenarios.includes(scenarioId)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Scenarios</CardTitle>
            <CardDescription>Choose a scenario to practice financial decision-making</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeScenario.id === scenario.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  } ${isScenarioCompleted(scenario.id) ? "border-green-200 bg-green-50" : ""}`}
                  onClick={() => handleScenarioChange(scenario)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${activeScenario.id === scenario.id ? "bg-primary text-white" : "bg-gray-100"}`}
                    >
                      <scenario.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{scenario.title}</h3>
                        {isScenarioCompleted(scenario.id) && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">{scenario.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Scenarios Completed</span>
                  <span className="text-sm font-medium">
                    {completedScenarios.length}/{scenarios.length}
                  </span>
                </div>
                <Progress value={(completedScenarios.length / scenarios.length) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Current Score</span>
                  <span className="text-sm font-medium">{score} points</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Difficulty Levels Completed</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">Easy</div>
                    <div className="text-xs text-gray-500">
                      {
                        completedScenarios.filter((id) => scenarios.find((s) => s.id === id)?.difficulty === "Easy")
                          .length
                      }{" "}
                      /{scenarios.filter((s) => s.difficulty === "Easy").length}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">Medium</div>
                    <div className="text-xs text-gray-500">
                      {
                        completedScenarios.filter((id) => scenarios.find((s) => s.id === id)?.difficulty === "Medium")
                          .length
                      }{" "}
                      /{scenarios.filter((s) => s.difficulty === "Medium").length}
                    </div>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">Hard</div>
                    <div className="text-xs text-gray-500">
                      {
                        completedScenarios.filter((id) => scenarios.find((s) => s.id === id)?.difficulty === "Hard")
                          .length
                      }{" "}
                      /{scenarios.filter((s) => s.difficulty === "Hard").length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge
                  className={`mb-2 ${
                    activeScenario.difficulty === "Easy"
                      ? "bg-green-500"
                      : activeScenario.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {activeScenario.difficulty}
                </Badge>
                <CardTitle>{activeScenario.title}</CardTitle>
                <CardDescription>{activeScenario.description}</CardDescription>
              </div>
              <Badge variant="outline">{activeScenario.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <img
                src={activeScenario.image || "/placeholder.svg"}
                alt={activeScenario.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">{currentQuestion.text}</h3>

                <RadioGroup value={selectedOption || ""} className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-3 transition-all ${
                        selectedOption === option.id ? "border-primary" : "border-gray-200"
                      } ${showResult && option.id === currentQuestion.correctOptionId ? "bg-green-50" : ""} ${
                        showResult && selectedOption === option.id && option.id !== currentQuestion.correctOptionId
                          ? "bg-red-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          disabled={showResult}
                          onClick={() => handleOptionSelect(option.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.text}
                          </Label>

                          {showResult && option.consequence && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-2 text-sm"
                            >
                              <p
                                className={`p-2 rounded ${
                                  option.id === currentQuestion.correctOptionId
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100"
                                }`}
                              >
                                <strong>Consequence:</strong> {option.consequence}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-2">Explanation</h4>
                  <p>{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <div>
              <Badge variant="outline" className="bg-gray-100">
                Question {currentQuestionIndex + 1} of {activeScenario.questions.length}
              </Badge>
            </div>
            <div className="flex gap-3">
              {!showResult ? (
                <Button onClick={handleSubmit} disabled={!selectedOption}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < activeScenario.questions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete Scenario <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
