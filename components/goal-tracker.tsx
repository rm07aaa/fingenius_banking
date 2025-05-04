"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Target, Trash2, Edit, Plus, Check, ArrowRight, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define types
type Goal = {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  notes?: string
  createdAt: string
}

// Default goals
const defaultGoals: Goal[] = [
  {
    id: "1",
    title: "New Gaming Console",
    targetAmount: 400,
    currentAmount: 150,
    deadline: "2025-12-25",
    category: "Entertainment",
    notes: "Saving $25 per week from allowance",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Summer Camp",
    targetAmount: 300,
    currentAmount: 75,
    deadline: "2025-06-15",
    category: "Education",
    createdAt: "2025-02-01",
  },
  {
    id: "3",
    title: "Emergency Fund",
    targetAmount: 200,
    currentAmount: 200,
    deadline: "2025-05-01",
    category: "Savings",
    notes: "Goal completed! Keeping for emergencies.",
    createdAt: "2024-11-10",
  },
]

// Goal categories
const goalCategories = ["Entertainment", "Education", "Savings", "Technology", "Clothing", "Travel", "Gifts", "Other"]

export default function GoalTracker() {
  // State for goals
  const [goals, setGoals] = useState<Goal[]>(defaultGoals)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    category: "Savings",
    notes: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Calculate total savings across all goals
  const totalSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const overallProgress = totalTargets > 0 ? (totalSavings / totalTargets) * 100 : 0

  // Get completed goals
  const completedGoals = goals.filter((goal) => goal.currentAmount >= goal.targetAmount)
  const activeGoals = goals.filter((goal) => goal.currentAmount < goal.targetAmount)

  // Sort active goals by deadline (closest first)
  activeGoals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

  // Handle adding a new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      return
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title || "",
      targetAmount: newGoal.targetAmount || 0,
      currentAmount: newGoal.currentAmount || 0,
      deadline: newGoal.deadline || "",
      category: newGoal.category || "Savings",
      notes: newGoal.notes,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setGoals((prev) => [...prev, goal])
    setIsAddingGoal(false)
    setNewGoal({
      title: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: "",
      category: "Savings",
      notes: "",
    })

    setSuccessMessage("New goal added successfully!")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Handle updating a goal
  const handleUpdateGoal = () => {
    if (!editingGoal) return

    setGoals((prev) => prev.map((goal) => (goal.id === editingGoal.id ? editingGoal : goal)))

    setEditingGoal(null)
    setSuccessMessage("Goal updated successfully!")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Handle deleting a goal
  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
    setSuccessMessage("Goal deleted successfully!")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Handle contributing to a goal
  const handleContribute = (id: string, amount: number) => {
    if (amount <= 0) return

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          const newAmount = goal.currentAmount + amount
          const isCompleted = newAmount >= goal.targetAmount

          return {
            ...goal,
            currentAmount: newAmount,
            notes: isCompleted
              ? `${goal.notes || ""} Goal completed on ${new Date().toLocaleDateString()}!`.trim()
              : goal.notes,
          }
        }
        return goal
      }),
    )

    setSuccessMessage(`Added $${amount} to your goal!`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate days remaining for a goal
  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Add Goal Button */}
          <div className="flex justify-end">
            <Button onClick={() => setIsAddingGoal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Goal
            </Button>
          </div>

          {/* Active Goals List */}
          {activeGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                const daysRemaining = getDaysRemaining(goal.deadline)

                return (
                  <Card key={goal.id} className="overflow-hidden">
                    <div
                      className="h-2"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: progress < 30 ? "#f87171" : progress < 70 ? "#fbbf24" : "#4ade80",
                      }}
                    ></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2">{goal.category}</Badge>
                          <CardTitle>{goal.title}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditingGoal(goal)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${goal.currentAmount.toFixed(2)} saved</span>
                          <span>Goal: ${goal.targetAmount.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            ${daysRemaining > 30 ? "bg-green-50 text-green-700" : ""}
                            ${daysRemaining > 7 && daysRemaining <= 30 ? "bg-yellow-50 text-yellow-700" : ""}
                            ${daysRemaining <= 7 ? "bg-red-50 text-red-700" : ""}
                          `}
                        >
                          Due: {formatDate(goal.deadline)}
                        </Badge>
                      </div>

                      {goal.notes && (
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">{goal.notes}</div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Contribution
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add to {goal.title}</DialogTitle>
                            <DialogDescription>Add money to your savings goal</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount">Amount ($)</Label>
                              <Input id="amount" type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="source">Source</Label>
                              <Select defaultValue="allowance">
                                <SelectTrigger id="source">
                                  <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="allowance">Allowance</SelectItem>
                                  <SelectItem value="gift">Gift</SelectItem>
                                  <SelectItem value="job">Job/Chores</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                const amountInput = document.getElementById("amount") as HTMLInputElement
                                const amount = Number.parseFloat(amountInput.value)
                                if (!isNaN(amount) && amount > 0) {
                                  handleContribute(goal.id, amount)
                                }
                              }}
                            >
                              Save Contribution
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Active Goals</h3>
                <p className="text-gray-500 text-center mb-6">
                  You don't have any active savings goals yet. Create one to start tracking your progress!
                </p>
                <Button onClick={() => setIsAddingGoal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Goal
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Completed Goals */}
          {completedGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="overflow-hidden border-green-200">
                  <div className="h-2 bg-green-500"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100">{goal.category}</Badge>
                        <CardTitle>{goal.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Final Amount</span>
                        <span className="text-sm font-medium">${goal.currentAmount.toFixed(2)}</span>
                      </div>
                      <Progress value={100} className="h-2 bg-green-100" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Goal: ${goal.targetAmount.toFixed(2)}</span>
                        <span className="text-green-600 font-medium">
                          {goal.currentAmount > goal.targetAmount
                            ? `$${(goal.currentAmount - goal.targetAmount).toFixed(2)} extra`
                            : "Goal met"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Completed before {formatDate(goal.deadline)}</span>
                      </div>
                    </div>

                    {goal.notes && <div className="text-sm text-gray-600 bg-green-50 p-2 rounded-md">{goal.notes}</div>}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Goal
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Completed Goals Yet</h3>
                <p className="text-gray-500 text-center mb-6">
                  Keep working on your active goals! Your completed goals will appear here.
                </p>
                <Button variant="outline" onClick={() => document.querySelector('[data-value="active"]')?.click()}>
                  View Active Goals
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{goals.length}</div>
                <p className="text-sm text-gray-500">
                  {activeGoals.length} active, {completedGoals.length} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSavings.toFixed(2)}</div>
                <p className="text-sm text-gray-500">Across all your goals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overallProgress.toFixed(0)}%</div>
                <Progress value={overallProgress} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Goal Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Goals by Category</CardTitle>
              <CardDescription>See how your goals are distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalCategories.map((category) => {
                  const categoryGoals = goals.filter((goal) => goal.category === category)
                  if (categoryGoals.length === 0) return null

                  const totalAmount = categoryGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
                  const savedAmount = categoryGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
                  const categoryProgress = (savedAmount / totalAmount) * 100

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{category}</span>
                        <span className="text-sm">{categoryGoals.length} goals</span>
                      </div>
                      <Progress value={categoryProgress} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${savedAmount.toFixed(2)} saved</span>
                        <span>${totalAmount.toFixed(2)} total</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Setting Tips</CardTitle>
              <CardDescription>Make your financial goals more achievable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-2">Be Specific</h3>
                <p className="text-blue-700">
                  Instead of "Save money for a bike," try "Save $200 for a mountain bike by June 1st." Specific goals
                  are easier to track and achieve.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Break It Down</h3>
                <p className="text-green-700">
                  For larger goals, break them into smaller milestones. If you need $400 for a console in 4 months, aim
                  to save $100 each month.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 mb-2">Celebrate Progress</h3>
                <p className="text-purple-700">
                  Celebrate when you reach 25%, 50%, and 75% of your goal. Small celebrations keep you motivated!
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Learn More About Goal Setting
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Goal Dialog */}
      <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>Set a new savings goal to track your progress</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., New Bike, Gaming Console, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount ($)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={newGoal.targetAmount || ""}
                  onChange={(e) =>
                    setNewGoal((prev) => ({
                      ...prev,
                      targetAmount: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAmount">Starting Amount ($)</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  value={newGoal.currentAmount || ""}
                  onChange={(e) =>
                    setNewGoal((prev) => ({
                      ...prev,
                      currentAmount: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Target Date</Label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, deadline: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newGoal.category}
                onValueChange={(value) => setNewGoal((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {goalCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                value={newGoal.notes || ""}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional details about your goal"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Goal Dialog */}
      <Dialog open={!!editingGoal} onOpenChange={(open) => !open && setEditingGoal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>Update your savings goal details</DialogDescription>
          </DialogHeader>
          {editingGoal && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Goal Title</Label>
                <Input
                  id="edit-title"
                  value={editingGoal.title}
                  onChange={(e) => setEditingGoal((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-targetAmount">Target Amount ($)</Label>
                  <Input
                    id="edit-targetAmount"
                    type="number"
                    value={editingGoal.targetAmount}
                    onChange={(e) =>
                      setEditingGoal((prev) =>
                        prev
                          ? {
                              ...prev,
                              targetAmount: Number.parseFloat(e.target.value) || 0,
                            }
                          : null,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-currentAmount">Current Amount ($)</Label>
                  <Input
                    id="edit-currentAmount"
                    type="number"
                    value={editingGoal.currentAmount}
                    onChange={(e) =>
                      setEditingGoal((prev) =>
                        prev
                          ? {
                              ...prev,
                              currentAmount: Number.parseFloat(e.target.value) || 0,
                            }
                          : null,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-deadline">Target Date</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={editingGoal.deadline}
                  onChange={(e) => setEditingGoal((prev) => (prev ? { ...prev, deadline: e.target.value } : null))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingGoal.category}
                  onValueChange={(value) => setEditingGoal((prev) => (prev ? { ...prev, category: value } : null))}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes (Optional)</Label>
                <Input
                  id="edit-notes"
                  value={editingGoal.notes || ""}
                  onChange={(e) => setEditingGoal((prev) => (prev ? { ...prev, notes: e.target.value } : null))}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingGoal(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}
