"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, DollarSign, ArrowRight, Plus, Minus, PiggyBank, Clock, Wallet, Send, QrCode } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type Transaction = {
  id: string
  type: "deposit" | "withdrawal" | "payment" | "transfer"
  amount: number
  description: string
  date: string
  category?: string
}

export default function DigitalWallet() {
  const [balance, setBalance] = useState(250)
  const [savings, setSavings] = useState(150)
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [showSendMoney, setShowSendMoney] = useState(false)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [recipient, setRecipient] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      type: "deposit",
      amount: 50,
      description: "Allowance",
      date: "May 2, 2025",
      category: "Income",
    },
    {
      id: "tx2",
      type: "payment",
      amount: -15,
      description: "Movie Tickets",
      date: "May 1, 2025",
      category: "Entertainment",
    },
    {
      id: "tx3",
      type: "transfer",
      amount: -25,
      description: "Transfer to Savings",
      date: "Apr 29, 2025",
      category: "Savings",
    },
    {
      id: "tx4",
      type: "withdrawal",
      amount: -10,
      description: "Lunch",
      date: "Apr 28, 2025",
      category: "Food",
    },
    {
      id: "tx5",
      type: "deposit",
      amount: 20,
      description: "Birthday Gift",
      date: "Apr 25, 2025",
      category: "Income",
    },
  ])

  const handleAddMoney = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return

    const newAmount = Number(amount)
    setBalance(balance + newAmount)

    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      type: "deposit",
      amount: newAmount,
      description: "Added Money",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "Income",
    }

    setTransactions([newTransaction, ...transactions])
    setAmount("")
    setShowAddMoney(false)
  }

  const handleSendMoney = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > balance || !recipient) return

    const newAmount = Number(amount)
    setBalance(balance - newAmount)

    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      type: "payment",
      amount: -newAmount,
      description: `Payment to ${recipient}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "Transfer",
    }

    setTransactions([newTransaction, ...transactions])
    setAmount("")
    setRecipient("")
    setShowSendMoney(false)
  }

  const handleTransferToSavings = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > balance) return

    const newAmount = Number(amount)
    setBalance(balance - newAmount)
    setSavings(savings + newAmount)

    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      type: "transfer",
      amount: -newAmount,
      description: "Transfer to Savings",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "Savings",
    }

    setTransactions([newTransaction, ...transactions])
    setAmount("")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-purple-700 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Main Wallet</span>
              <CreditCard className="h-5 w-5" />
            </CardTitle>
            <CardDescription className="text-white/70">Your spending account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${balance.toFixed(2)}</div>
            <div className="text-sm text-white/70">Available Balance</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="secondary"
              size="sm"
              className="text-primary"
              onClick={() => {
                setShowAddMoney(true)
                setShowSendMoney(false)
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-primary"
              onClick={() => {
                setShowSendMoney(true)
                setShowAddMoney(false)
              }}
            >
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Savings</span>
              <PiggyBank className="h-5 w-5" />
            </CardTitle>
            <CardDescription>Your future fund</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${savings.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Saved Amount</div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setShowAddMoney(false)
                setShowSendMoney(false)
              }}
            >
              <ArrowRight className="h-4 w-4 mr-1" /> Transfer from Main
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goal</CardTitle>
            <CardDescription>New Gaming Console</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">${savings} of $400</span>
            </div>
            <Progress value={(savings / 400) * 100} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{Math.round((savings / 400) * 100)}% complete</span>
              <span>${400 - savings} to go</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Est. completion: 8 weeks</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                On Track
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>

      {showAddMoney && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Add Money</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAddMoney(false)}>
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <CardDescription>Add money to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} value={paymentMethod}>
                  <div className="flex items-center space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2 text-gray-500"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                      </svg>
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 p-3 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-blue-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      This is a simulation. In a real app, you would connect to a payment processor.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAddMoney} disabled={!amount || isNaN(Number(amount))}>
                Add ${amount || "0.00"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {showSendMoney && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Send Money</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowSendMoney(false)}>
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <CardDescription>Send money to friends or businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Enter name or username"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="send-amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="send-amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">Available balance: ${balance.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" size="sm">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                className="w-full"
                onClick={handleSendMoney}
                disabled={
                  !amount || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > balance || !recipient
                }
              >
                Send ${amount || "0.00"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setAmount("")
                  setRecipient("")
                  setShowSendMoney(false)
                }}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-600"
                            : transaction.type === "transfer"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <Plus className="h-5 w-5" />
                        ) : transaction.type === "transfer" ? (
                          <ArrowRight className="h-5 w-5" />
                        ) : (
                          <Minus className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Spending Insights</CardTitle>
              <CardDescription>Understand your financial habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Spending by Category</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Entertainment</span>
                        <span className="text-sm font-medium">$15.00 (30%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Food</span>
                        <span className="text-sm font-medium">$10.00 (20%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Savings</span>
                        <span className="text-sm font-medium">$25.00 (50%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Financial Health Score</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#eee"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="3"
                          strokeDasharray="75, 100"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-3xl font-bold">75</div>
                        <div className="text-xs text-gray-500">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-600">
                    You're saving regularly and managing expenses well!
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Tips to Improve</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <span className="text-sm">Try to save 20% of any money you receive</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <span className="text-sm">Track all your expenses to understand spending patterns</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
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
                      <span className="text-sm">Set specific savings goals for things you want</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
