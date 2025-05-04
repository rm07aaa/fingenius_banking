"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, BookOpen, Award, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type VideoLesson = {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  youtubeId: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  views: number
  likes: number
}

const videoLessons: VideoLesson[] = [
  {
    id: "video1",
    title: "What is a Budget?",
    description: "Learn the basics of budgeting in under 60 seconds",
    duration: "0:45",
    thumbnail: `https://img.youtube.com/vi/25kKB2CdWz8/maxresdefault.jpg`,
    youtubeId: "25kKB2CdWz8",
    category: "Budgeting",
    difficulty: "Beginner",
    views: 1245,
    likes: 89,
  },
  {
    id: "video2",
    title: "Needs vs. Wants",
    description: "The simple way to decide where your money should go",
    duration: "0:58",
    thumbnail: `https://img.youtube.com/vi/5CNeXuYZXYE/maxresdefault.jpg`,
    youtubeId: "5CNeXuYZXYE",
    category: "Spending",
    difficulty: "Beginner",
    views: 982,
    likes: 76,
  },
  {
    id: "video3",
    title: "Saving for Goals",
    description: "How to save for things you really want",
    duration: "1:05",
    thumbnail: `https://img.youtube.com/vi/xfOT2elC2Ok/maxresdefault.jpg`,
    youtubeId: "xfOT2elC2Ok",
    category: "Saving",
    difficulty: "Beginner",
    views: 1102,
    likes: 94,
  },
  {
    id: "video4",
    title: "What is Interest?",
    description: "Understanding how interest works in 60 seconds",
    duration: "0:52",
    thumbnail: `https://img.youtube.com/vi/aCYm_6Xapf8/maxresdefault.jpg`,
    youtubeId: "aCYm_6Xapf8",
    category: "Banking",
    difficulty: "Intermediate",
    views: 876,
    likes: 65,
  },
  {
    id: "video5",
    title: "Credit Cards Explained",
    description: "The basics of credit cards and how they work",
    duration: "1:12",
    thumbnail: `https://img.youtube.com/vi/jw_CWHs2YDU/maxresdefault.jpg`,
    youtubeId: "jw_CWHs2YDU",
    category: "Credit",
    difficulty: "Intermediate",
    views: 1320,
    likes: 103,
  },
  {
    id: "video6",
    title: "What is Investing?",
    description: "Simple explanation of investing for beginners",
    duration: "0:59",
    thumbnail: `https://img.youtube.com/vi/25kKB2CdWz8/maxresdefault.jpg`,
    youtubeId: "25kKB2CdWz8",
    category: "Investing",
    difficulty: "Intermediate",
    views: 945,
    likes: 81,
  },
]

type DailyChallenge = {
  id: string
  title: string
  description: string
  points: number
  difficulty: "Easy" | "Medium" | "Hard"
  completed: boolean
}

const dailyChallenges: DailyChallenge[] = [
  {
    id: "challenge1",
    title: "Track Every Expense",
    description: "Record everything you spend money on today",
    points: 50,
    difficulty: "Easy",
    completed: true,
  },
  {
    id: "challenge2",
    title: "No-Spend Day",
    description: "Go a full day without spending any money",
    points: 100,
    difficulty: "Medium",
    completed: false,
  },
  {
    id: "challenge3",
    title: "Research a Stock",
    description: "Pick a company and learn about its stock performance",
    points: 75,
    difficulty: "Medium",
    completed: false,
  },
  {
    id: "challenge4",
    title: "Create a Savings Goal",
    description: "Set up a specific savings goal with a timeline",
    points: 50,
    difficulty: "Easy",
    completed: true,
  },
  {
    id: "challenge5",
    title: "Compare Prices",
    description: "Find the best price for something you want to buy",
    points: 50,
    difficulty: "Easy",
    completed: false,
  },
]

export default function MicroLearning() {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleVideoSelect = (video: VideoLesson) => {
    setSelectedVideo(video)
    setIsPlaying(false)
    setProgress(0)
  }

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // Simulate video progress
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="videos">Micro-Videos</TabsTrigger>
          <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedVideo ? (
                <Card className="overflow-hidden">
                  <div className="relative aspect-video bg-gray-100">
                    {!isPlaying ? (
                      <>
                        <img
                          src={selectedVideo.thumbnail || "/placeholder.svg"}
                          alt={selectedVideo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Button
                            size="lg"
                            className="rounded-full h-16 w-16 flex items-center justify-center"
                            onClick={handlePlayVideo}
                          >
                            <Play className="h-8 w-8 ml-1" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    <div className="absolute bottom-0 left-0 right-0">
                      <Progress value={isPlaying ? 100 : progress} className="h-1 rounded-none" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{selectedVideo.category}</Badge>
                        <CardTitle>{selectedVideo.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedVideo.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{selectedVideo.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{selectedVideo.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Like
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <Button size="sm" disabled={!isPlaying}>
                      <Award className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-8 text-center">
                  <div>
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Micro-Lesson</h3>
                    <p className="text-gray-500">
                      Choose a video from the list to start learning financial concepts in bite-sized lessons.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Micro-Lessons Library</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {videoLessons.map((video) => (
                  <motion.div
                    key={video.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    variants={fadeIn}
                  >
                    <Card
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedVideo?.id === video.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-24 h-24">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3 flex-1">
                          <h4 className="font-medium line-clamp-1">{video.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{video.description}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {video.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{video.views} views</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Financial Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Complete these daily challenges to build healthy financial habits and earn points. New challenges
                    appear every day!
                  </p>

                  <div className="space-y-4">
                    {dailyChallenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className={`p-4 rounded-lg border ${
                          challenge.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                challenge.completed
                                  ? "bg-green-500 text-white"
                                  : "border-2 border-gray-300 text-transparent"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">{challenge.title}</h4>
                              <p className="text-sm text-gray-600">{challenge.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={`
                                ${challenge.difficulty === "Easy" ? "bg-green-50 text-green-700" : ""}
                                ${challenge.difficulty === "Medium" ? "bg-yellow-50 text-yellow-700" : ""}
                                ${challenge.difficulty === "Hard" ? "bg-red-50 text-red-700" : ""}
                              `}
                            >
                              {challenge.difficulty}
                            </Badge>
                            <Badge variant="secondary">{challenge.points} pts</Badge>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            size="sm"
                            variant={challenge.completed ? "outline" : "default"}
                            disabled={challenge.completed}
                          >
                            {challenge.completed ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Create a Budget Under $10</h3>
                    <p className="text-gray-700 mb-4">
                      Challenge: Create a budget for a day with only $10 to spend. What would you prioritize?
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          5 days left
                        </Badge>
                        <Badge variant="secondary">200 pts</Badge>
                      </div>
                      <Button>Accept Challenge</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Weekly Challenges</span>
                        <span className="text-sm font-medium">2/5</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Points Earned</span>
                        <span className="text-sm font-medium">350 pts</span>
                      </div>
                      <div className="bg-gray-100 h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-purple-500 h-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0 pts</span>
                        <span>Next Level: 1000 pts</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Current Streak</h4>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-primary">5</div>
                        <div className="text-sm text-gray-600">days in a row</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Complete at least one challenge daily to maintain your streak!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <span className="font-medium">MoneyMaster2010</span>
                      </div>
                      <span className="font-bold">1250 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <span className="font-medium">FinanceKid</span>
                      </div>
                      <span className="font-bold">1120 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <span className="font-medium">SaverQueen</span>
                      </div>
                      <span className="font-bold">980 pts</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md border border-primary/30 bg-primary/5">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                          8
                        </div>
                        <span className="font-medium">You</span>
                      </div>
                      <span className="font-bold">350 pts</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Full Leaderboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
