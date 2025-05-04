"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  PiggyBank,
  BookOpen,
  Target,
  BarChart2,
  MessageCircle,
  Smartphone,
  Wallet,
  Video,
  Trophy,
  Award,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EnhancedChatbot from "@/components/enhanced-chatbot"
import LearningModule from "@/components/learning-module"
import GameCard from "@/components/game-card"
import LeaderboardTable from "@/components/leaderboard-table"
import HeroSection from "@/components/hero-section"
import AchievementBadge from "@/components/achievement-badge"

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      setProgress(65)
    }
  }, [inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection />

      {/* New Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <Badge className="mb-2">NEW FEATURES</Badge>
            <h2 className="text-4xl font-bold mb-4">Interactive Financial Education</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our new interactive features designed to make financial learning fun and engaging
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Financial Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Make financial decisions in realistic scenarios and see how they affect your finances
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/financial-simulator">
                  <Button variant="outline">
                    Try Scenarios <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Micro-Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn financial concepts through short videos and complete daily challenges
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/financial-simulator?tab=microlearning">
                  <Button variant="outline">
                    Watch & Learn <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Digital Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Practice managing money, saving, and making payments in a safe environment
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/financial-simulator?tab=wallet">
                  <Button variant="outline">
                    Try Wallet <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Weekly Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete financial challenges, earn points, and compete on the leaderboard
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/financial-simulator?tab=microlearning">
                  <Button variant="outline">
                    Join Challenges <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section id="learn" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <Badge className="mb-2">CURRICULUM</Badge>
            <h2 className="text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master essential financial skills through interactive lessons, games, and real-world challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LearningModule
              icon={<PiggyBank className="h-8 w-8" />}
              title="Saving Basics"
              description="Learn how to save effectively and build your first emergency fund"
              format="Interactive Video + Quiz"
              level="Beginner"
              duration="15 min"
            />

            <LearningModule
              icon={<DollarSign className="h-8 w-8" />}
              title="Budgeting 101"
              description="Create your first budget and track your spending habits"
              format="Simulation Game"
              level="Beginner"
              duration="20 min"
            />

            <LearningModule
              icon={<TrendingUp className="h-8 w-8" />}
              title="Investing Fundamentals"
              description="Understand how investing works and why starting early matters"
              format="Interactive Story"
              level="Intermediate"
              duration="25 min"
            />

            <LearningModule
              icon={<BarChart2 className="h-8 w-8" />}
              title="Banking Basics"
              description="Learn about different types of accounts and banking services"
              format="Virtual Bank Tour"
              level="Beginner"
              duration="15 min"
            />

            <LearningModule
              icon={<Target className="h-8 w-8" />}
              title="Smart Spending"
              description="Make better purchasing decisions and avoid common money traps"
              format="Decision Challenge"
              level="Beginner"
              duration="20 min"
            />

            <LearningModule
              icon={<BookOpen className="h-8 w-8" />}
              title="Credit & Loans"
              description="Understand how credit works and the impact of borrowing"
              format="Interactive Simulation"
              level="Intermediate"
              duration="30 min"
            />
          </div>
        </div>
      </section>

      {/* Financial Academy Section */}
      <section id="academy" className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <Badge className="mb-2">PROGRESS TRACKING</Badge>
            <h2 className="text-4xl font-bold mb-4">Your Financial Academy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track your progress, earn badges, and level up your financial knowledge
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Completion</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="relative pt-8 pb-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                      <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: "60%" }}></div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <span className="text-xs mt-2">Beginner</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span className="text-xs mt-2">Saver</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <span className="text-xs mt-2">Planner</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <span className="text-xs mt-2">Investor</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
                          5
                        </div>
                        <span className="text-xs mt-2">Expert</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Saving Basics</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Budgeting 101</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Banking Basics</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        In Progress
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Smart Spending</span>
                      <Badge variant="outline" className="bg-gray-100 text-gray-500">
                        Not Started
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue Learning</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
                <CardDescription>Earn badges as you learn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <AchievementBadge icon={<PiggyBank className="h-6 w-6" />} name="Saving Star" earned={true} />
                  <AchievementBadge icon={<Target className="h-6 w-6" />} name="Budget Master" earned={true} />
                  <AchievementBadge icon={<Award className="h-6 w-6" />} name="Quiz Champion" earned={true} />
                  <AchievementBadge icon={<TrendingUp className="h-6 w-6" />} name="Investor" earned={false} />
                  <AchievementBadge icon={<BookOpen className="h-6 w-6" />} name="Knowledge Seeker" earned={false} />
                  <AchievementBadge icon={<Users className="h-6 w-6" />} name="Team Player" earned={false} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Badges
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Calendar</CardTitle>
                <CardDescription>Your learning streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <h3 className="font-medium">May 2025</h3>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    <div className="text-xs text-gray-500">Mon</div>
                    <div className="text-xs text-gray-500">Tue</div>
                    <div className="text-xs text-gray-500">Wed</div>
                    <div className="text-xs text-gray-500">Thu</div>
                    <div className="text-xs text-gray-500">Fri</div>
                    <div className="text-xs text-gray-500">Sat</div>
                    <div className="text-xs text-gray-500">Sun</div>

                    {[...Array(7)].map((_, i) => (
                      <div key={`empty-${i}`} className="h-8"></div>
                    ))}

                    {[...Array(31)].map((_, i) => {
                      const day = i + 1
                      const isCompleted = day < 8
                      const isToday = day === 8

                      return (
                        <div
                          key={`day-${day}`}
                          className={`
                          h-8 w-8 rounded-full flex items-center justify-center text-xs mx-auto
                          ${isCompleted ? "bg-green-100 text-green-700" : ""}
                          ${isToday ? "bg-primary text-white" : ""}
                        `}
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-center space-x-4 pt-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-100 mr-2"></div>
                      <span className="text-xs">Completed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs">Today</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Streak</span>
                      <span className="text-sm font-bold text-green-700">7 days</span>
                    </div>
                    <Progress value={70} className="h-1 mt-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Games & Challenges Section */}
      <section id="games" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <Badge className="mb-2">INTERACTIVE</Badge>
            <h2 className="text-4xl font-bold mb-4">Games & Challenges</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Test your financial skills with fun games and earn points on the leaderboard
            </p>
          </motion.div>

          <Tabs defaultValue="games" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="games">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <GameCard
                  title="Budget Challenge"
                  description="Manage a monthly budget and make smart spending decisions"
                  image="https://i.pinimg.com/736x/12/76/3c/12763cf1b10a8301a2daa1ab1c85d502.jpg"
                  difficulty="Easy"
                  duration="10 min"
                  points={100}
                />

                <GameCard
                  title="Investment Simulator"
                  description="Build a portfolio and watch it grow over simulated time"
                  image="https://i.pinimg.com/736x/ed/15/c4/ed15c46d6d89f6856b46bd1951d186fc.jpg"
                  difficulty="Medium"
                  duration="15 min"
                  points={150}
                />

                <GameCard
                  title="Money Maze"
                  description="Navigate financial decisions in this interactive adventure"
                  image="https://i.pinimg.com/736x/72/11/99/721199d0507ad8af5646f22046cc991d.jpg"
                  difficulty="Hard"
                  duration="20 min"
                  points={200}
                />

                <GameCard
                  title="Savings Race"
                  description="Compete to save the most money in a limited time"
                  image="https://i.pinimg.com/736x/cf/30/25/cf3025bde5d0d74861ab6723bea3b61b.jpg"
                  difficulty="Easy"
                  duration="5 min"
                  points={75}
                />

                <GameCard
                  title="Financial Trivia"
                  description="Test your knowledge with fun financial facts"
                  image="https://i.pinimg.com/736x/4c/34/eb/4c34eb740215c3479aa9f923e0aee73f.jpg"
                  difficulty="Medium"
                  duration="10 min"
                  points={100}
                />

                <GameCard
                  title="Entrepreneur Tycoon"
                  description="Build your business empire from scratch"
                  image="https://i.pinimg.com/736x/c5/d0/ba/c5d0baee3087794bfc9d09b2d2915ee1.jpg"
                  difficulty="Hard"
                  duration="30 min"
                  points={250}
                />
              </div>
              <div className="text-center mt-8">
                <Link href="/games">
                  <Button size="lg">
                    View All Games <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle>Top Players This Week</CardTitle>
                  <CardDescription>Compete with other players and earn rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeaderboardTable />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Your Rank</Button>
                  <Button>Join Competition</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <Badge className="mb-2">AI POWERED</Badge>
            <h2 className="text-4xl font-bold mb-4">Financial AI Assistant</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get personalized financial advice and answers to your money questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <CardTitle>Ask FinBot</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Our AI assistant can help you with:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Personalized saving strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Budgeting advice for teens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Explaining financial terms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Goal-setting guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Chat with FinBot</Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Financial Dictionary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Learn financial terms in simple language</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Saving Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">See how your savings can grow over time</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      Calculate <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="lg:pl-8">
              <EnhancedChatbot />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Become a Money Genius?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of teens learning financial skills in a fun and engaging way!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started for Free
              </Button>
              <Link href="/financial-simulator">
                <Button size="lg" variant="outline" className="px-8 bg-white/10 border-white/30 hover:bg-white/20">
                  Try Financial Simulator
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Fixed Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
