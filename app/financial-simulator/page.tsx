"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GameSimulation from "@/components/game-simulation"
import MicroLearning from "@/components/micro-learning"
import DigitalWallet from "@/components/digital-wallet"

export default function FinancialSimulator() {
  const [activeTab, setActiveTab] = useState("simulation")

  // Get tab from URL query parameter if available
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
    if (tabParam && ["simulation", "microlearning", "wallet"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

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
          <Badge className="mb-2">INTERACTIVE LEARNING</Badge>
          <h1 className="text-4xl font-bold mb-4">Financial Simulator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn essential financial skills through interactive simulations, micro-lessons, and a virtual wallet
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3">
            <TabsTrigger value="simulation">Financial Scenarios</TabsTrigger>
            <TabsTrigger value="microlearning">Micro-Learning</TabsTrigger>
            <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="simulation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Decision Simulator</CardTitle>
                <CardDescription>
                  Make financial decisions in realistic scenarios and see how they affect your finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GameSimulation />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="microlearning" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Micro-Learning & Challenges</CardTitle>
                <CardDescription>
                  Learn financial concepts through short videos and complete daily challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MicroLearning />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Virtual Wallet Simulator</CardTitle>
                <CardDescription>
                  Practice managing money, saving, and making payments in a safe environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DigitalWallet />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
