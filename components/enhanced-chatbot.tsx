"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Smile, Paperclip, HelpCircle, Lightbulb, BookOpen, DollarSign, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Enhanced financial education responses database
const responses: Record<string, string[]> = {
  save: [
    "To save money effectively, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
    "A good way to save is to open a savings account and automatically deposit a small amount each week.",
    "Try the 24-hour rule: When you want to buy something, wait 24 hours before purchasing. Often you'll realize you don't need it that much.",
  ],
  budget: [
    "A budget is a plan that shows how you'll spend your money. Start by writing down your income and expenses.",
    "To create a simple budget, follow these steps: 1) Calculate income, 2) List expenses, 3) Categorize them, 4) Set limits for each category.",
    "Apps like 'Mint' or 'YNAB' can help you keep a simple budget and track your spending.",
  ],
  allowance: [
    "You can manage your allowance by dividing it into three categories: immediate spending, short-term savings, and long-term savings.",
    "Try the 1/3 rule: Spend 1/3, save 1/3 for something you'll buy soon, and save 1/3 for long-term goals.",
    "Keep a simple journal where you note every expense. This will help you understand where your money is going.",
  ],
  bank: [
    "Banks are institutions that help you keep your money safe and earn interest.",
    "A teen bank account is usually opened with the help of a parent or guardian and has no monthly fees.",
    "Bank cards allow you to make payments without carrying physical cash. There are debit cards that use the money in your account and credit cards that are like a loan.",
  ],
  credit: [
    "Credit is when you borrow money from a bank or another financial institution and pay it back with interest.",
    "Interest is the extra payment you make when you take out a loan. The higher the interest, the more you'll pay.",
    "It's important to understand that credit should be used carefully and only when truly necessary.",
  ],
  invest: [
    "Investing means putting money into something with the hope it will grow over time.",
    "Even teens can start investing with the help of a parent or guardian through custodial accounts.",
    "Compound interest is like magic for investors - it's when you earn interest on your interest, making your money grow faster over time.",
  ],
  debt: [
    "Debt is money that you owe to someone else, usually with interest added.",
    "Good debt can help you build wealth (like education loans), while bad debt is for things that lose value quickly.",
    "Always try to pay more than the minimum payment on any debt to reduce the total interest you'll pay.",
  ],
  goal: [
    "Financial goals should be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound.",
    "Break big financial goals into smaller milestones to make them less overwhelming.",
    "Write down your financial goals and review them regularly to stay motivated.",
  ],
}

// Financial terms dictionary
const financialTerms: Record<string, string> = {
  interest:
    "Money paid for the use of money lent. When you save money in a bank, they pay you interest. When you borrow money, you pay interest.",
  inflation: "The increase in prices over time, which reduces the purchasing power of your money.",
  budget: "A plan for how you will spend your money each month, including income, expenses, and savings.",
  credit_score:
    "A number that represents your creditworthiness, based on your credit history. Higher scores mean better loan terms.",
  compound_interest:
    "Interest calculated on both the initial principal and the accumulated interest. This makes your money grow faster over time.",
  diversification: "Spreading your investments across different types of assets to reduce risk.",
  liquidity: "How quickly an asset can be converted to cash without affecting its value.",
  net_worth: "The total value of what you own (assets) minus what you owe (liabilities).",
  emergency_fund:
    "Money saved for unexpected expenses or financial emergencies, typically 3-6 months of living expenses.",
  capital_gain: "The profit from selling an asset for more than you paid for it.",
}

// Personalized scenarios
const personalScenarios: Record<string, string> = {
  school_lunch:
    "For school lunches, try setting a weekly budget. If lunch costs $5/day, that's $25/week. Could you bring lunch from home some days to save money?",
  allowance:
    "With a $20 weekly allowance, try saving $5 (25%), spending $10 on fun, and keeping $5 for unexpected expenses.",
  birthday_money:
    "If you received $100 for your birthday, consider saving 50%, spending 30% on something you want, and using 20% to try a small investment with a parent's help.",
  smartphone:
    "For a new $600 smartphone, you could save $50/month to buy it in a year, or $100/month to get it in 6 months. Is it worth waiting?",
  game_console:
    "To buy a $400 gaming console, try saving 25% of your allowance and earnings. If you get $40/week, saving $10 would get you there in 40 weeks.",
  clothes:
    "For clothes shopping, set a seasonal budget. Maybe $150 for back-to-school? Look for sales and consider thrift stores for unique finds at lower prices.",
  movies:
    "Movie outings can add up. A ticket, snacks, and transportation might cost $25. Consider matinees, bringing your own snacks, or alternating with free activities.",
  college:
    "Even small college savings add up. Saving just $20/month from age 13-18 gives you $1,440 plus interest for books or expenses.",
}

export default function EnhancedChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm FinBot, your AI financial assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {
      const botResponse = getBotResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    // Check for financial terms
    for (const [term, definition] of Object.entries(financialTerms)) {
      if (
        lowerMessage.includes(term.toLowerCase()) &&
        (lowerMessage.includes("what is") ||
          lowerMessage.includes("explain") ||
          lowerMessage.includes("define") ||
          lowerMessage.includes("mean"))
      ) {
        return `${term.replace("_", " ").toUpperCase()}: ${definition}`
      }
    }

    // Check for personal scenarios
    for (const [scenario, advice] of Object.entries(personalScenarios)) {
      if (lowerMessage.includes(scenario.toLowerCase())) {
        return advice
      }
    }

    // Check for keywords in the message
    for (const [keyword, responseArray] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        // Return a random response from the matching category
        return responseArray[Math.floor(Math.random() * responseArray.length)]
      }
    }

    // Handle specific question patterns
    if (lowerMessage.match(/how (much|many|often|long)/i)) {
      return "That's a great question about amounts or timing. The answer depends on your specific situation. Could you provide more details about your income, expenses, or goals?"
    }

    if (lowerMessage.match(/should i (buy|get|purchase|spend)/i)) {
      return "When deciding on a purchase, consider: 1) Do you need it or just want it? 2) Can you afford it without going into debt? 3) Have you compared prices? 4) Will you still value it in a month?"
    }

    // Handle greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! I'm your AI financial education assistant. How can I help you learn about money today?"
    }

    // Default response if no keywords match
    return "I'm not sure how to help with that specific question. Try asking about saving, budgeting, investing, credit, debt, or specific financial terms. You can also ask me about everyday scenarios like managing allowance or saving for something you want to buy."
  }

  const filteredTerms = Object.entries(financialTerms).filter(
    ([term]) => searchTerm === "" || term.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-primary text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="FinBot" />
              <AvatarFallback className="bg-primary-foreground text-primary">FB</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">FinBot AI</h3>
              <p className="text-xs opacity-90">Financial Assistant</p>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-primary-foreground/20">
              <TabsTrigger
                value="chat"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="dictionary"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                Dictionary
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                Tools
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="chat" className="p-4 space-y-4 h-full overflow-y-auto m-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-gray-100 rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </TabsContent>

          <TabsContent value="dictionary" className="p-4 h-full overflow-y-auto m-0">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Search financial terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
              </div>

              {filteredTerms.length > 0 ? (
                <div className="space-y-3">
                  {filteredTerms.map(([term, definition]) => (
                    <div key={term} className="bg-gray-50 p-3 rounded-lg border">
                      <h4 className="font-medium text-primary mb-1">{term.replace("_", " ").toUpperCase()}</h4>
                      <p className="text-sm text-gray-700">{definition}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No matching terms found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="p-4 h-full overflow-y-auto m-0">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Calculator className="h-8 w-8 mb-2 text-primary" />
                <span>Savings Calculator</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <DollarSign className="h-8 w-8 mb-2 text-primary" />
                <span>Budget Planner</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Lightbulb className="h-8 w-8 mb-2 text-primary" />
                <span>Financial Quiz</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <HelpCircle className="h-8 w-8 mb-2 text-primary" />
                <span>Ask a Question</span>
              </Button>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Quick Financial Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Save at least 10-20% of any money you receive</li>
                <li>• Track all your expenses to understand your spending habits</li>
                <li>• Before buying something, wait 24 hours to avoid impulse purchases</li>
                <li>• Set specific financial goals with deadlines</li>
                <li>• Learn the difference between needs and wants</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {activeTab === "chat" && (
        <CardFooter className="border-t p-3">
          <div className="flex w-full items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Ask me about money, saving, or budgeting..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button size="icon" className="rounded-full" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
