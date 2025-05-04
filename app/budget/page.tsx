"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BudgetPlanner from "@/components/budget-planner"
import GoalTracker from "@/components/goal-tracker"

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState("budget")

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
          <Badge className="mb-2">MONEY MANAGEMENT</Badge>
          <h1 className="text-4xl font-bold mb-4">Budget & Goals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your budget, track your spending, and set financial goals to achieve your dreams
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2">
            <TabsTrigger value="budget">Budget Planner</TabsTrigger>
            <TabsTrigger value="goals">Goal Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Budget Planner</CardTitle>
                <CardDescription>Create and manage your budget to track income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetPlanner />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Goal Tracker</CardTitle>
                <CardDescription>Set and track your savings goals to achieve your dreams</CardDescription>
              </CardHeader>
              <CardContent>
                <GoalTracker />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
