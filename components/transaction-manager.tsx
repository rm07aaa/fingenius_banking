"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Trash2,
  Edit,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  DollarSign,
  Search,
  Check,
  Download,
  BarChart4,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Define types
type Transaction = {
  id: string
  date: string
  amount: number
  description: string
  category: string
  type: "income" | "expense"
}

// Default transactions
const defaultTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-05-01",
    amount: 50,
    description: "Weekly Allowance",
    category: "Allowance",
    type: "income",
  },
  {
    id: "2",
    date: "2025-05-02",
    amount: 15,
    description: "Movie Tickets",
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "3",
    date: "2025-05-03",
    amount: 8.5,
    description: "Lunch",
    category: "Food",
    type: "expense",
  },
  {
    id: "4",
    date: "2025-05-04",
    amount: 20,
    description: "Babysitting",
    category: "Side Jobs",
    type: "income",
  },
  {
    id: "5",
    date: "2025-05-05",
    amount: 25,
    description: "Savings Deposit",
    category: "Savings",
    type: "expense",
  },
  {
    id: "6",
    date: "2025-05-06",
    amount: 12.99,
    description: "Book",
    category: "Education",
    type: "expense",
  },
  {
    id: "7",
    date: "2025-05-07",
    amount: 30,
    description: "Birthday Gift",
    category: "Gifts",
    type: "income",
  },
]

// Categories
const incomeCategories = ["Allowance", "Side Jobs", "Gifts", "Other Income"]
const expenseCategories = [
  "Food",
  "Entertainment",
  "Clothes",
  "Education",
  "Savings",
  "Transportation",
  "Gifts",
  "Other",
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

export default function TransactionManager() {
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions)

  // State for new/editing transaction
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    description: "",
    category: "",
    type: "expense",
  })

  // State for filters
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  })

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Apply filters whenever transactions or filters change
  useEffect(() => {
    let filtered = [...transactions]
    
    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter(t => t.type === filters.type)
    }
    
    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter(t => t.category === filters.category)
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(t => t.date >= filters.dateFrom)
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(t => t.date <= filters.dateTo)
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(term) || 
        t.category.toLowerCase().includes(term)
      )
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    setFilteredTransactions(filtered)\
  }, [transactions  - new Date(a.date).getTime())

  setFilteredTransactions(filtered)
}
, [transactions, filters])

// Calculate totals
const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

const balance = totalIncome - totalExpenses

// Handle adding a new transaction
const handleAddTransaction = () => {
  if (!newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.date) {
    return
  }

  const transaction: Transaction = {
    id: Date.now().toString(),
    date: newTransaction.date || new Date().toISOString().split("T")[0],
    amount: newTransaction.amount || 0,
    description: newTransaction.description || "",
    category: newTransaction.category || "",
    type: newTransaction.type || "expense",
  }

  setTransactions((prev) => [...prev, transaction])
  setIsAddingTransaction(false)
  setNewTransaction({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    description: "",
    category: "",
    type: "expense",
  })

  setSuccessMessage("Transaction added successfully!")
  setShowSuccess(true)
  setTimeout(() => setShowSuccess(false), 3000)
}

// Handle updating a transaction
const handleUpdateTransaction = () => {
  if (!editingTransaction) return

  setTransactions((prev) => prev.map((t) => (t.id === editingTransaction.id ? editingTransaction : t)))

  setEditingTransaction(null)
  setSuccessMessage("Transaction updated successfully!")
  setShowSuccess(true)
  setTimeout(() => setShowSuccess(false), 3000)
}

// Handle deleting a transaction
const handleDeleteTransaction = (id: string) => {
  setTransactions((prev) => prev.filter((t) => t.id !== id))
  setSuccessMessage("Transaction deleted successfully!")
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

// Prepare data for charts
const prepareChartData = () => {
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {}
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (expensesByCategory[t.category]) {
        expensesByCategory[t.category] += t.amount
      } else {
        expensesByCategory[t.category] = t.amount
      }
    })

  // Convert to array for pie chart
  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  // Group by date for bar chart (last 7 days)
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(today.getDate() - i)
    return date.toISOString().split("T")[0]
  }).reverse()

  const barData = last7Days.map((date) => {
    const dayTransactions = transactions.filter((t) => t.date === date)
    const income = dayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expense = dayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return {
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      income,
      expense,
    }
  })

  return { pieData, barData }
}

const { pieData, barData } = prepareChartData()

return (
    <div className="space-y-6">
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-700">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">${totalIncome.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-700">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-700">${totalExpenses.toFixed(2)}</div>
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
          
          {/* Filters and Add Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <Label className="text-xs">Type</Label>
                    <Select 
                      value={filters.type}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <Label className="text-xs">Category</Label>
                    <Select 
                      value={filters.category}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {[...incomeCategories, ...expenseCategories]
                          .filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
                          .map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <Label className="text-xs">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <Label className="text-xs">From</Label>
                        <Input 
                          type="date" 
                          className="h-8 mt-1"
                          value={filters.dateFrom}
                          onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">To</Label>
                        <Input 
                          type="date" 
                          className="h-8 mt-1"
                          value={filters.dateTo}
                          onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenuItem 
                    className="justify-center mt-2 cursor-pointer"
                    onClick={() => setFilters({
                      type: "all",
                      category: "all",
                      dateFrom: "",
                      dateTo: "",
                      searchTerm: ""
                    })}
                  >
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-8 h-9"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                />
              </div>
            </div>
            
            <Button onClick={() => setIsAddingTransaction(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
          
          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transactions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length > 0 ? (
                <div className="space-y-4">
                  {filteredTransactions.map(transaction => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            transaction.type === "income" 
                              ? "bg-green-100 text-green-600" 
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "income" 
                            ? <ArrowDownLeft className="h-5 w-5" /> 
                            : <ArrowUpRight className="h-5 w-5" />
                          }
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(transaction.date)}
                            <Badge 
                              variant="outline" 
                              className="ml-2 text-xs py-0 h-5"
                            >
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span 
                          className={`font-medium ${
                            transaction.type === "income" 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </span>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setEditingTransaction(transaction)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart4 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Transactions Found</h3>
                  <p className="text-gray-500 mb-4">
                    {filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo || filters.searchTerm
                      ? "Try adjusting your filters to see more results."
                      : "Start by adding your first transaction."}
                  </p>
                  {(filters.type !== "all" || filters.category !== "all" || filters.dateFrom || filters.dateTo || filters.searchTerm) && (
                    <Button 
                      variant="outline" 
                      onClick={() => setFilters({
                        type: "all",
                        category: "all",
                        dateFrom: "",
                        dateTo: "",
                        searchTerm: ""
                      })}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Transactions
              </Button>
              <div className="text-sm text-gray-500">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No expense data available
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="income" fill="#4ade80" name="Income" />
                    <Bar dataKey="expense" fill="#f87171" name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Summary Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Key metrics about your finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Income Sources</h3>
                  <div className="space-y-1">
                    {incomeCategories.map(category => {
                      const amount = transactions
                        .filter(t => t.type === "income" && t.category === category)
                        .reduce((sum, t) => sum + t.amount, 0)
                      
                      if (amount === 0) return null
                      
                      const percentage = totalIncome > 0 ? (amount / totalIncome) * 100 : 0
                      
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <span className="text-sm font-medium">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Top Expenses</h3>
                  <div className="space-y-1">
                    {Object.entries(
                      transactions
                        .filter(t => t.type === "expense")
                        .reduce((acc, t) => {
                          acc[t.category] = (acc[t.category] || 0) + t.amount
                          return acc
                        }, {} as Record<string, number>)
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([category, amount]) => {
                        const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
                        
                        return (
                          <div key={category} className="flex justify-between items-center">
                            <span className="text-sm">{category}</span>
                            <span className="text-sm font-medium">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Monthly Overview</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Income</span>
                      <span className="text-sm font-medium text-green-600">${totalIncome.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Expenses</span>
                      <span className="text-sm font-medium text-red-600">${totalExpenses.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Net Balance</span>
                      <span className={`text-sm font-medium ${balance >= 0 ? "text-blue-600" : "text-amber-600"}`}>
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings Rate</span>
                      <span className="text-sm font-medium">
                        {totalIncome > 0 
                          ? `${((balance / totalIncome) * 100).toFixed(0)}%` 
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Transaction Dialog */}
      <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Record a new income or expense
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select 
                value={newTransaction.type}
                onValueChange={(value) => setNewTransaction(prev => ({ 
                  ...prev, 
                  type: value as "income" | "expense",
                  category: "" // Reset category when type changes
                }))}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={newTransaction.description}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., Movie Tickets, Allowance, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  id="amount" 
                  type="number"
                  value={newTransaction.amount || ""}
                  onChange={(e) => setNewTransaction(prev => ({ 
                    ...prev, 
                    amount: Number.parseFloat(e.target.value) || 0
                  }))}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newTransaction.category}
                onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {newTransaction.type === "income" 
                    ? incomeCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))
                    : expenseCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingTransaction(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTransaction}>
              Add Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Transaction Dialog */}
      <Dialog open={!!editingTransaction} onOpenChange={(open) => !open && setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Update transaction details
            </DialogDescription>
          </DialogHeader>
          {editingTransaction && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Transaction Type</Label>
                <Select 
                  value={editingTransaction.type}
                  onValueChange={(value) => setEditingTransaction(prev => prev ? {
                    ...prev, 
                    type: value as "income" | "expense",
                    category: "" // Reset category when type changes
                  } : null)}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input 
                  id="edit-description" 
                  value={editingTransaction.description}
                  onChange={(e) => setEditingTransaction(prev => prev ? { 
                    ...prev, 
                    description: e.target.value 
                  } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    id="edit-amount" 
                    type="number"
                    value={editingTransaction.amount}
                    onChange={(e) => setEditingTransaction(prev => prev ? { 
                      ...prev, 
                      amount: Number.parseFloat(e.target.value) || 0
                    } : null)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingTransaction.category}
                  onValueChange={(value) => setEditingTransaction(prev => prev ? { 
                    ...prev, 
                    category: value 
                  } : null)}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {editingTransaction.type === "income" 
                      ? incomeCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))
                      : expenseCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input 
                  id="edit-date" 
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) => setEditingTransaction(prev => prev ? { 
                    ...prev, 
                    date: e.target.value 
                  } : null)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTransaction(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTransaction}>
              Save Changes
            </Button>
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
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}
