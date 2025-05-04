"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Smile, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Financial education responses database
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
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm FinBot, your financial assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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

    // Check for keywords in the message
    for (const [keyword, responseArray] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        // Return a random response from the matching category
        return responseArray[Math.floor(Math.random() * responseArray.length)]
      }
    }

    // Handle greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! I'm your financial education assistant. How can I help you learn about money today?"
    }

    // Default response if no keywords match
    return "I'm not sure how to help with that specific question. Try asking about saving, budgeting, allowance management, banks, or credit."
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="bg-primary text-white py-3 px-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="FinBot" />
            <AvatarFallback className="bg-primary-foreground text-primary">FB</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">FinBot</h3>
            <p className="text-xs opacity-90">Financial Assistant</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
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
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
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
    </Card>
  )
}
