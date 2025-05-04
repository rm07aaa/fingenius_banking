"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Plus, Trash2, Save, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define types
type BudgetCategory = {
  id: string
  name: string
  amount: number
  color: string
  type: "income" | "expense"
}

type BudgetData = {
  categories: BudgetCategory[]
  totalIncome: number
  totalExpenses: number
  savingsGoal: number
}

// Default budget data
const defaultBudgetData: BudgetData = {
  categories: [
    { id: "1", name: "Allowance", amount: 50, color: "#4ade80", type: "income" },
    { id: "2", name: "Side Jobs", amount: 30, color: "#60a5fa", type: "income" },
    { id: "3", name: "Entertainment", amount: 20, color: "#f87171", type: "expense" },
    { id: "4", name: "Food", amount: 15, color: "#fbbf24", type: "expense" },
    { id: "5", name: "Savings", amount: 25, color: "#a78bfa", type: "expense" },
    { id: "6", name: "Clothes", amount: 10, color: "#34d399", type: "expense" },
    { id: "7", name: "Other", amount: 5, color: "#9ca3af", type: "expense" },
  ],
  totalIncome: 80,
  totalExpenses: 75,
  savingsGoal: 25,
}

// Color palette for new categories
const colorPalette = [
  "#4ade80",
  "#60a5fa",
  "#f87171",
  "#fbbf24",
  "#a78bfa",
  "#34d399",
  "#9ca3af",
  "#fb923c",
  "#38bdf8",
  "#fb7185",
]

export default function BudgetPlanner() {
  // State for budget data
  const [budgetData, setBudgetData] = useState<BudgetData>(defaultBudgetData)

  // State for new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    amount: "",
    type: "expense" as "income" | "expense",
  })

  // State for saving status
  const [isSaved, setIsSaved] = useState(false)
  const [showTips, setShowTips] = useState(false)

  // Calculate totals whenever categories change
  useEffect(() => {
    const totalIncome = budgetData.categories
      .filter((cat) => cat.type === "income")
      .reduce((sum, cat) => sum + cat.amount, 0)

    const totalExpenses = budgetData.categories
      .filter((cat) => cat.type === "expense")
      .reduce((sum, cat) => sum + cat.amount, 0)

    setBudgetData((prev) => ({
      ...prev,
      totalIncome,
      totalExpenses,
    }))
  }, [budgetData.categories])

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.amount) return

    const amount = Number.parseFloat(newCategory.amount)
    if (isNaN(amount) || amount <= 0) return

    const newCat: BudgetCategory = {
      id: Date.now().toString(),
      name: newCategory.name,
      amount: amount,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      type: newCategory.type,
    }

    setBudgetData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCat],
    }))

    // Reset form
    setNewCategory({
      name: "",
      amount: "",
      type: "expense",
    })
  }

  // Handle deleting a category
  const handleDeleteCategory = (id: string) => {
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat.id !== id),
    }))
  }

  // Handle saving the budget
  const handleSaveBudget = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a success message
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)

    // Save to localStorage
    localStorage.setItem("fingenius-budget", JSON.stringify(budgetData))
  }

  // Prepare data for pie charts
  const incomeData = budgetData.categories.filter((cat) => cat.type === "income")
  const expenseData = budgetData.categories.filter((cat) => cat.type === "expense")

  // Calculate balance
  const balance = budgetData.totalIncome - budgetData.totalExpenses
  const savingsProgress = budgetData.savingsGoal > 0 ? Math.min(100, (balance / budgetData.savingsGoal) * 100) : 0

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-700">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">${budgetData.totalIncome.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-700">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-700">${budgetData.totalExpenses.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className={balance >= 0 ? "bg-blue-50" : "bg-amber-50"}>
              <CardHeader className="pb-2">
                <CardTitle className={balance >= 0 ? "text-blue-700" : "text-amber-700"}>Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${balance >= 0 ? "text-blue-700" : "text-amber-700"}`}>
                  ${balance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>Where your money comes from</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {incomeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">No income categories yet</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {expenseData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">No expense categories yet</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Savings Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
              <CardDescription>Track your progress towards your savings goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="savingsGoal">Savings Goal ($)</Label>
                  <Input
                    id="savingsGoal"
                    type="number"
                    value={budgetData.savingsGoal}
                    onChange={(e) =>
                      setBudgetData((prev) => ({
                        ...prev,
                        savingsGoal: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <Button onClick={handleSaveBudget} className="mt-8">
                  <Save className="mr-2 h-4 w-4" />
                  Save Goal
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Balance: ${balance.toFixed(2)}</span>
                  <span>Goal: ${budgetData.savingsGoal.toFixed(2)}</span>
                </div>
                <Progress value={savingsProgress} className="h-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{savingsProgress.toFixed(0)}% of goal</span>
                  {balance < budgetData.savingsGoal && (
                    <span>${(budgetData.savingsGoal - balance).toFixed(2)} to go</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {isSaved && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">Your budget has been saved successfully!</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Add New Category */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>Create a new income or expense category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Allowance, Food, Games"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryAmount">Amount ($)</Label>
                  <Input
                    id="categoryAmount"
                    type="number"
                    value={newCategory.amount}
                    onChange={(e) => setNewCategory((prev) => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryType">Type</Label>
                  <Select
                    value={newCategory.type}
                    onValueChange={(value) =>
                      setNewCategory((prev) => ({
                        ...prev,
                        type: value as "income" | "expense",
                      }))
                    }
                  >
                    <SelectTrigger id="categoryType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </CardFooter>
          </Card>

          {/* Category List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Categories</CardTitle>
              <CardDescription>Manage your income and expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-medium">Income Categories</h3>
                {incomeData.length > 0 ? (
                  <div className="space-y-2">
                    {incomeData.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                          <span>{category.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">${category.amount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No income categories yet</p>
                )}

                <h3 className="font-medium mt-6">Expense Categories</h3>
                {expenseData.length > 0 ? (
                  <div className="space-y-2">
                    {expenseData.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                          <span>{category.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">${category.amount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No expense categories yet</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveBudget}>
                <Save className="mr-2 h-4 w-4" />
                Save Budget
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budgeting Tips for Teens</CardTitle>
              <CardDescription>Smart ways to manage your money</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-2">The 50/30/20 Rule</h3>
                <p className="text-blue-700">Try to allocate your money this way:</p>
                <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
                  <li>50% for needs (savings, school supplies)</li>
                  <li>30% for wants (entertainment, snacks)</li>
                  <li>20% for future (long-term savings)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Track Every Expense</h3>
                <p className="text-green-700">
                  Keep track of everything you spend, even small purchases. They add up quickly! Use the categories
                  feature to organize your spending and see patterns.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-2">Set Clear Goals</h3>
                <p className="text-amber-700">
                  Having a specific savings goal (like a new game or concert tickets) makes it easier to avoid impulse
                  spending. Use the savings goal tracker to visualize your progress.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 mb-2">The 24-Hour Rule</h3>
                <p className="text-purple-700">
                  Before making a non-essential purchase, wait 24 hours. If you still want it after a day, it's less
                  likely to be an impulse buy.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium text-red-700 mb-2">Needs vs. Wants</h3>
                <p className="text-red-700">
                  Learn to distinguish between things you need and things you want. Prioritize needs first, then use
                  remaining money for wants.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Learn More About Budgeting
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
