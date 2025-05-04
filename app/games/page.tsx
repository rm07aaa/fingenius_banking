"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GameCard from "@/components/game-card"
import LeaderboardTable from "@/components/leaderboard-table"

export default function GamesPage() {
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
          <Badge className="mb-2">INTERACTIVE</Badge>
          <h1 className="text-4xl font-bold mb-4">Games & Challenges</h1>
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
      </main>

      <Footer />
    </div>
  )
}
