"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Play, Clock, BookOpen, Award, ArrowRight, CheckCircle, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Define types
type Question = {
  id: string
  text: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation: string
}

type Lesson = {
  id: string
  title: string
  description: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  image: string
  videoUrl?: string
  content: string
  quiz: Question[]
  completed: boolean
  progress: number
}

// Sample lesson data
const sampleLesson: Lesson = {
  id: "lesson1",
  title: "Understanding Budgeting Basics",
  description: "Learn the fundamentals of creating and maintaining a personal budget",
  duration: "15 min",
  level: "Beginner",
  category: "Budgeting",
  image: "/images/lesson-budgeting.png",
  videoUrl: "#",
  content: `
    <h2>What is a Budget?</h2>
    <p>A budget is a plan that helps you track your money. It shows how much money you have coming in and going out over a specific period of time, usually a month.</p>
    
    <h2>Why Budgeting Matters</h2>
    <p>Budgeting helps you:</p>
    <ul>
      <li>Know exactly where your money is going</li>
      <li>Make sure you don't spend more than you earn</li>
      <li>Save for things that are important to you</li>
      <li>Reduce financial stress</li>
      <li>Achieve your financial goals faster</li>
    </ul>
    
    <h2>The 50/30/20 Rule</h2>
    <p>A simple way to budget is the 50/30/20 rule:</p>
    <ul>
      <li><strong>50%</strong> for needs (savings, school supplies)</li>
      <li><strong>30%</strong> for wants (entertainment, treats)</li>
      <li><strong>20%</strong> for future (long-term savings)</li>
    </ul>
    
    <h2>Steps to Create Your First Budget</h2>
    <ol>
      <li>Track your income (allowance, gifts, job earnings)</li>
      <li>List your expenses (things you spend money on)</li>
      <li>Categorize expenses as needs or wants</li>
      <li>Set spending limits for each category</li>
      <li>Track your spending and adjust as needed</li>
    </ol>
    
    <h2>Budgeting Tools</h2>
    <p>You can use different tools to track your budget:</p>
    <ul>
      <li>Paper and pencil</li>
      <li>Spreadsheet</li>
      <li>Budgeting apps</li>
      <li>The FinGenius Budget Planner</li>
    </ul>
  `,
  quiz: [
    {
      id: "q1",
      text: "What is a budget?",
      options: [
        {
          id: "q1a",
          text: "A list of things you want to buy",
          isCorrect: false,
        },
        {
          id: "q1b",
          text: "A plan that tracks your income and expenses",
          isCorrect: true,
        },
        {
          id: "q1c",
          text: "A type of bank account",
          isCorrect: false,
        },
        {
          id: "q1d",
          text: "A way to borrow money",
          isCorrect: false,
        },
      ],
      explanation:
        "A budget is a financial plan that tracks your income (money coming in) and expenses (money going out) over a specific period of time, usually a month.",
    },
    {
      id: "q2",
      text: "According to the 50/30/20 rule, what percentage should go to 'wants'?",
      options: [
        {
          id: "q2a",
          text: "50%",
          isCorrect: false,
        },
        {
          id: "q2b",
          text: "30%",
          isCorrect: true,
        },
        {
          id: "q2c",
          text: "20%",
          isCorrect: false,
        },
        {
          id: "q2d",
          text: "10%",
          isCorrect: false,
        },
      ],
      explanation:
        "The 50/30/20 rule suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and future goals.",
    },
    {
      id: "q3",
      text: "Which of the following is NOT a benefit of budgeting?",
      options: [
        {
          id: "q3a",
          text: "Knowing where your money is going",
          isCorrect: false,
        },
        {
          id: "q3b",
          text: "Helping you save for goals",
          isCorrect: false,
        },
        {
          id: "q3c",
          text: "Allowing you to spend without limits",
          isCorrect: true,
        },
        {
          id: "q3d",
          text: "Reducing financial stress",
          isCorrect: false,
        },
      ],
      explanation:
        "Budgeting actually helps you set spending limits, not spend without limits. It's about making conscious decisions with your money.",
    },
    {
      id: "q4",
      text: "What is the first step in creating a budget?",
      options: [
        {
          id: "q4a",
          text: "Set spending limits",
          isCorrect: false,
        },
        {
          id: "q4b",
          text: "Track your income",
          isCorrect: true,
        },
        {
          id: "q4c",
          text: "Categorize expenses",
          isCorrect: false,
        },
        {
          id: "q4d",
          text: "Open a savings account",
          isCorrect: false,
        },
      ],
      explanation:
        "The first step in creating a budget is to track your income - you need to know how much money you have coming in before you can plan how to spend it.",
    },
    {
      id: "q5",
      text: "Which of these would be considered a 'need' in a budget?",
      options: [
        {
          id: "q5a",
          text: "Movie tickets",
          isCorrect: false,
        },
        {
          id: "q5b",
          text: "Video games",
          isCorrect: false,
        },
        {
          id: "q5c",
          text: "School supplies",
          isCorrect: true,
        },
        {
          id: "q5d",
          text: "Streaming service subscription",
          isCorrect: false,
        },
      ],
      explanation:
        "School supplies are considered a need because they're essential for education. The other options are typically categorized as 'wants' because they're not essential for basic living.",
    },
  ],
  completed: false,
  progress: 0,
}

// Related lessons
const relatedLessons = [
  {
    id: "lesson2",
    title: "Tracking Your Expenses",
    description: "Learn how to monitor and categorize your spending",
    duration: "10 min",
    level: "Beginner",
    category: "Budgeting",
    image: "/images/lesson-tracking.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson3",
    title: "Setting Financial Goals",
    description: "Create SMART goals for your money",
    duration: "12 min",
    level: "Beginner",
    category: "Planning",
    image: "/images/lesson-goals.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson4",
    title: "Saving Strategies for Teens",
    description: "Effective ways to save money on a teen budget",
    duration: "15 min",
    level: "Beginner",
    category: "Saving",
    image: "/images/lesson-saving.png",
    completed: false,
    progress: 0,
  },
]

export default function LessonModule() {
  const [activeTab, setActiveTab] = useState("content")
  const [currentLesson, setCurrentLesson] = useState<Lesson>(sampleLesson)
  const [isWatchingVideo, setIsWatchingVideo] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Handle starting the video
  const handleStartVideo = () => {
    setIsWatchingVideo(true)
    // In a real implementation, this would play the actual video
    // For now, we'll just update the progress
    setCurrentLesson((prev) => ({
      ...prev,
      progress: 50,
    }))
  }

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const currentQuestion = currentLesson.quiz[currentQuestionIndex]
    const isCorrect = currentQuestion.options.find((opt) => opt.id === selectedAnswer)?.isCorrect

    if (isCorrect) {
      setQuizScore((prev) => prev + 1)
    }

    setShowExplanation(true)
  }

  // Handle moving to the next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)

    if (currentQuestionIndex < currentLesson.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizCompleted(true)
      // Update lesson progress to 100% when quiz is completed
      setCurrentLesson((prev) => ({
        ...prev,
        progress: 100,
        completed: true,
      }))
    }
  }

  // Handle restarting the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)
    setQuizScore(0)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            {/* Lesson Header */}
            <div className="relative">
              <img
                src={currentLesson.image || "/placeholder.svg?height=300&width=800"}
                alt={currentLesson.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge>{currentLesson.category}</Badge>
                <Badge
                  variant="outline"
                  className={`
                    ${currentLesson.level === "Beginner" ? "bg-green-50 text-green-700" : ""}
                    ${currentLesson.level === "Intermediate" ? "bg-yellow-50 text-yellow-700" : ""}
                    ${currentLesson.level === "Advanced" ? "bg-red-50 text-red-700" : ""}
                  `}
                >
                  {currentLesson.level}
                </Badge>
              </div>
              {currentLesson.completed && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500">Completed</Badge>
                </div>
              )}
            </div>

            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{currentLesson.title}</CardTitle>
                  <CardDescription>{currentLesson.description}</CardDescription>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{currentLesson.duration}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{currentLesson.progress}%</span>
                </div>
                <Progress value={currentLesson.progress} className="h-2" />
              </div>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                <TabsTrigger value="quiz">Knowledge Check</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 py-4">
                {!isWatchingVideo && currentLesson.videoUrl && (
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                    <img
                      src={currentLesson.image || "/placeholder.svg?height=300&width=800"}
                      alt={currentLesson.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button
                        size="lg"
                        className="rounded-full h-16 w-16 flex items-center justify-center"
                        onClick={handleStartVideo}
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {isWatchingVideo && (
                  <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-xl font-bold mb-2">Video Playing</p>
                      <p className="text-sm">This is a simulation - in a real app, the video would play here</p>
                    </div>
                  </div>
                )}

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />

                <div className="flex justify-between mt-6">
                  <Button variant="outline">Previous Lesson</Button>
                  <Button onClick={() => setActiveTab("quiz")}>
                    Take Knowledge Check
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="space-y-6 py-4">
                {!quizCompleted ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Question {currentQuestionIndex + 1} of {currentLesson.quiz.length}
                      </h3>
                      <Badge variant="outline">
                        {Math.round(((currentQuestionIndex + 1) / currentLesson.quiz.length) * 100)}% Complete
                      </Badge>
                    </div>

                    <Card className="border-primary/20">
                      <CardContent className="pt-6">
                        <h4 className="text-lg font-medium mb-4">{currentLesson.quiz[currentQuestionIndex].text}</h4>

                        <RadioGroup
                          value={selectedAnswer || ""}
                          onValueChange={setSelectedAnswer}
                          className="space-y-3"
                          disabled={showExplanation}
                        >
                          {currentLesson.quiz[currentQuestionIndex].options.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-start space-x-2 p-3 rounded-md ${
                                showExplanation && option.isCorrect
                                  ? "bg-green-50 border border-green-200"
                                  : showExplanation && selectedAnswer === option.id && !option.isCorrect
                                    ? "bg-red-50 border border-red-200"
                                    : "hover:bg-gray-50 border border-transparent"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                                className={
                                  showExplanation && option.isCorrect
                                    ? "text-green-600 border-green-600"
                                    : showExplanation && selectedAnswer === option.id && !option.isCorrect
                                      ? "text-red-600 border-red-600"
                                      : ""
                                }
                              />
                              <Label
                                htmlFor={option.id}
                                className={`font-normal cursor-pointer ${
                                  showExplanation && option.isCorrect ? "text-green-700" : ""
                                } ${
                                  showExplanation && selectedAnswer === option.id && !option.isCorrect
                                    ? "text-red-700"
                                    : ""
                                }`}
                              >
                                {option.text}
                                {showExplanation && option.isCorrect && (
                                  <span className="ml-2 text-green-600">
                                    <Check className="inline h-4 w-4" />
                                  </span>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>

                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-blue-50 rounded-md"
                          >
                            <h5 className="font-medium text-blue-700 mb-1">Explanation</h5>
                            <p className="text-blue-700 text-sm">
                              {currentLesson.quiz[currentQuestionIndex].explanation}
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {!showExplanation ? (
                          <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="w-full">
                            Submit Answer
                          </Button>
                        ) : (
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuestionIndex < currentLesson.quiz.length - 1 ? "Next Question" : "Complete Quiz"}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-700 flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Quiz Completed!
                        </CardTitle>
                        <CardDescription className="text-green-700">
                          You've completed the knowledge check for this lesson.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-6">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-700 mb-4">
                            <span className="text-2xl font-bold">
                              {quizScore}/{currentLesson.quiz.length}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-green-700 mb-2">
                            {quizScore === currentLesson.quiz.length
                              ? "Perfect Score!"
                              : quizScore >= currentLesson.quiz.length / 2
                                ? "Good Job!"
                                : "Keep Learning!"}
                          </h3>
                          <p className="text-green-700">
                            {quizScore === currentLesson.quiz.length
                              ? "You've mastered this lesson!"
                              : quizScore >= currentLesson.quiz.length / 2
                                ? "You're on the right track. Review the lesson to improve your score."
                                : "Review the lesson material and try again to improve your understanding."}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={handleRestartQuiz}>
                          Retake Quiz
                        </Button>
                        <Button>
                          Next Lesson
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>You've Earned a Badge!</CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="h-12 w-12 text-primary" />
                          </div>
                          <h3 className="font-bold text-lg mb-1">Budgeting Basics</h3>
                          <p className="text-sm text-gray-500">
                            You've completed the Budgeting Basics lesson and quiz!
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Lesson Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>Budgeting Worksheet</span>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span>50/30/20 Calculator</span>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Video className="h-5 w-5 text-primary mr-3" />
                  <span>Budgeting Tips Video</span>
                </div>
                <Button variant="ghost" size="sm">
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Related Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                    <img
                      src={lesson.image || "/placeholder.svg?height=48&width=48"}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{lesson.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{lesson.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{lesson.level}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Lessons
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
