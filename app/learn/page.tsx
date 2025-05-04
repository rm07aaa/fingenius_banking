"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, BookOpen, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LessonModule from "@/components/lesson-module"

// Lesson data
const lessons = [
  {
    id: "lesson1",
    title: "Understanding Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a personal budget",
    duration: "15 min",
    level: "Beginner",
    category: "Budgeting",
    format: "Video + Quiz",
    image: "/images/lesson-budgeting.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson2",
    title: "Tracking Your Expenses",
    description: "Learn how to monitor and categorize your spending",
    duration: "10 min",
    level: "Beginner",
    category: "Budgeting",
    format: "Interactive",
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
    format: "Video + Quiz",
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
    format: "Interactive",
    image: "/images/lesson-saving.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson5",
    title: "Banking Basics",
    description: "Understanding different types of accounts and services",
    duration: "20 min",
    level: "Beginner",
    category: "Banking",
    format: "Video + Quiz",
    image: "/images/lesson-banking.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson6",
    title: "Introduction to Investing",
    description: "Learn the basics of growing your money through investments",
    duration: "25 min",
    level: "Intermediate",
    category: "Investing",
    format: "Video + Quiz",
    image: "/images/lesson-investing.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson7",
    title: "Understanding Credit",
    description: "Learn what credit is and how it affects your financial future",
    duration: "18 min",
    level: "Intermediate",
    category: "Credit",
    format: "Interactive",
    image: "/images/lesson-credit.png",
    completed: false,
    progress: 0,
  },
  {
    id: "lesson8",
    title: "Smart Shopping Techniques",
    description: "How to make informed purchasing decisions and save money",
    duration: "15 min",
    level: "Beginner",
    category: "Spending",
    format: "Video + Quiz",
    image: "/images/lesson-shopping.png",
    completed: false,
    progress: 0,
  },
]

// Learning paths
const learningPaths = [
  {
    id: "path1",
    title: "Financial Foundations",
    description: "Master the basics of personal finance",
    lessons: 8,
    duration: "2 hours",
    level: "Beginner",
    progress: 25,
    image: "/images/path-foundations.png",
  },
  {
    id: "path2",
    title: "Saving & Investing",
    description: "Learn to grow your money for the future",
    lessons: 6,
    duration: "1.5 hours",
    level: "Intermediate",
    progress: 0,
    image: "/images/path-investing.png",
  },
  {
    id: "path3",
    title: "Money Management",
    description: "Take control of your day-to-day finances",
    lessons: 7,
    duration: "1.8 hours",
    level: "Beginner",
    progress: 0,
    image: "/images/path-management.png",
  },
]

// Categories
const categories = ["All", "Budgeting", "Saving", "Investing", "Banking", "Credit", "Planning", "Spending"]

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("lessons")
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [levelFilter, setLevelFilter] = useState("All")

  // Filter lessons based on search term, category, and level
  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || lesson.category === categoryFilter
    const matchesLevel = levelFilter === "All" || lesson.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <Badge className="mb-2">FINANCIAL EDUCATION</Badge>
          <h1 className="text-4xl font-bold mb-4">Learn Financial Skills</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Master essential money skills through interactive lessons, quizzes, and real-world challenges
          </p>
        </motion.div>

        {selectedLesson ? (
          <div className="mb-8">
            <Button variant="outline" onClick={() => setSelectedLesson(null)} className="mb-6">
              ← Back to Lessons
            </Button>
            <LessonModule />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="lessons">Individual Lessons</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-8">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search lessons..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Lessons Grid */}
              {filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedLesson(lesson.id)}
                    >
                      <div className="relative h-40">
                        <img
                          src={lesson.image || "/placeholder.svg?height=160&width=320"}
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge>{lesson.category}</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-white">
                            {lesson.format}
                          </Badge>
                        </div>
                        {lesson.completed && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-green-500">Completed</Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{lesson.duration}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`
                              ${lesson.level === "Beginner" ? "bg-green-50 text-green-700" : ""}
                              ${lesson.level === "Intermediate" ? "bg-yellow-50 text-yellow-700" : ""}
                              ${lesson.level === "Advanced" ? "bg-red-50 text-red-700" : ""}
                            `}
                          >
                            {lesson.level}
                          </Badge>
                        </div>
                        {lesson.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{lesson.progress}%</span>
                            </div>
                            <Progress value={lesson.progress} className="h-1" />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full">
                          {lesson.progress > 0 ? "Continue Lesson" : "Start Lesson"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Lessons Found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any lessons matching your search criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setCategoryFilter("All")
                      setLevelFilter("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="paths" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningPaths.map((path) => (
                  <Card key={path.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-40">
                      <img
                        src={path.image || "/placeholder.svg?height=160&width=320"}
                        alt={path.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className={`
                            ${path.level === "Beginner" ? "bg-green-50 text-green-700" : ""}
                            ${path.level === "Intermediate" ? "bg-yellow-50 text-yellow-700" : ""}
                            ${path.level === "Advanced" ? "bg-red-50 text-red-700" : ""}
                          `}
                        >
                          {path.level}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{path.lessons} lessons</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{path.duration}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-1" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        {path.progress > 0 ? "Continue Path" : "Start Learning Path"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose a Learning Path?</CardTitle>
                  <CardDescription>
                    Learning paths provide a structured approach to mastering financial skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Structured Learning</h3>
                      <p className="text-sm text-gray-600">
                        Follow a carefully designed sequence of lessons that build on each other
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Track Your Progress</h3>
                      <p className="text-sm text-gray-600">
                        See how far you've come and what's next in your financial education journey
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Earn Certificates</h3>
                      <p className="text-sm text-gray-600">
                        Complete a learning path to earn a certificate of achievement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  )
}
