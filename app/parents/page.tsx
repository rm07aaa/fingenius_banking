"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Video, Users, BookOpen, ArrowRight, Check, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Resources data
const resources = [
  {
    id: "1",
    title: "Family Budget Template",
    description: "A customizable template to help your family track income, expenses, and savings goals.",
    type: "template",
    icon: FileText,
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Allowance Management Guide",
    description: "Learn different approaches to allowances and how to use them as teaching tools.",
    type: "guide",
    icon: BookOpen,
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Money Conversations Starter Kit",
    description: "Age-appropriate conversation starters to discuss money with your teen.",
    type: "toolkit",
    icon: Users,
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Financial Milestones Checklist",
    description: "Track your teen's progress through important financial literacy milestones.",
    type: "checklist",
    icon: Check,
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Teaching Investing to Teens",
    description: "A parent's guide to introducing investment concepts to teenagers.",
    type: "guide",
    icon: BookOpen,
    downloadUrl: "#",
  },
  {
    id: "6",
    title: "College Savings Calculator",
    description: "Plan for your child's education with this interactive calculator.",
    type: "tool",
    icon: FileText,
    downloadUrl: "#",
  },
]

// Workshops data
const workshops = [
  {
    id: "1",
    title: "Raising Financially Responsible Teens",
    description: "Learn strategies to help your teen develop healthy money habits that will last a lifetime.",
    date: "May 15, 2025",
    time: "7:00 PM - 8:30 PM",
    format: "Virtual",
    presenter: "Dr. Sarah Johnson",
    image: "/images/workshop-financial.png",
  },
  {
    id: "2",
    title: "College Planning: Financial Strategies",
    description: "Understand the various options for funding your child's education and how to prepare early.",
    date: "May 22, 2025",
    time: "6:30 PM - 8:00 PM",
    format: "Virtual",
    presenter: "Michael Rodriguez, CFP",
    image: "/images/workshop-college.png",
  },
  {
    id: "3",
    title: "Teaching Teens About Credit & Debt",
    description:
      "Help your teen understand credit scores, credit cards, and responsible borrowing before they're on their own.",
    date: "June 5, 2025",
    time: "7:00 PM - 8:30 PM",
    format: "Virtual",
    presenter: "Emma Thompson",
    image: "/images/workshop-credit.png",
  },
]

// FAQ data
const faqs = [
  {
    question: "At what age should I start teaching my child about money?",
    answer:
      "Financial education can begin as early as age 5-6 with basic concepts like saving and spending. By the teen years, they should be learning about budgeting, compound interest, and more complex topics. It's never too early to start with age-appropriate lessons.",
  },
  {
    question: "Should I give my teen an allowance?",
    answer:
      "Allowances can be valuable teaching tools when structured properly. Consider tying at least part of the allowance to chores or responsibilities. This helps teens understand the connection between work and income. Use the allowance as an opportunity to teach budgeting by encouraging them to allocate portions for spending, saving, and giving.",
  },
  {
    question: "How can I help my teen save for college?",
    answer:
      "Encourage your teen to contribute to their own college fund, even if it's a small amount. This gives them ownership in the process. Explore 529 plans and other tax-advantaged savings options. Discuss scholarship opportunities early and help them understand how their academic and extracurricular choices can impact financial aid options.",
  },
  {
    question: "Should my teen have a debit or credit card?",
    answer:
      "A debit card linked to a teen checking account can be a good first step, typically around age 13-14. This allows them to learn digital money management with guardrails. Consider a secured credit card or authorized user status on your credit card for older teens (16+) to begin building credit history under your supervision. Always pair this with education about responsible credit use.",
  },
  {
    question: "How can I teach my teen about investing?",
    answer:
      "Start with the basics of compound interest and how investments grow over time. Consider opening a custodial investment account where they can invest small amounts in companies they're familiar with. Use real-world examples and regular check-ins to discuss performance. Many brokerages offer teen-friendly educational resources.",
  },
  {
    question: "My teen spends money impulsively. How can I help?",
    answer:
      "Implement a waiting period rule (e.g., wait 24-48 hours before making non-essential purchases). Help them track their spending to recognize patterns. Discuss the difference between needs and wants, and work together to create specific savings goals that motivate them to delay gratification.",
  },
  {
    question: "How can I prepare my teen for financial independence?",
    answer:
      "Gradually increase financial responsibility as they demonstrate readiness. By late high school, they should be managing their own budget, understanding banking, and making some independent financial decisions. Consider a 'financial independence' timeline with specific skills they should master before college or moving out.",
  },
]

export default function ParentsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [email, setEmail] = useState("")

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
          <Badge className="mb-2">PARENT RESOURCES</Badge>
          <h1 className="text-4xl font-bold mb-4">For Parents & Guardians</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tools, resources, and guidance to help you support your teen's financial education journey
          </p>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="/images/parents-hero.png"
              alt="Parent and teen discussing finances"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Partner With Us in Your Teen's Financial Journey</h2>
            <p className="text-gray-600 mb-6">
              Research shows that parents are the primary influence on their children's financial behaviors. FinGenius
              provides the tools and resources you need to confidently guide your teen toward financial literacy and
              independence.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Monitor Progress</h3>
                  <p className="text-sm text-gray-600">
                    Track your teen's learning journey and celebrate their financial milestones
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Access Exclusive Resources</h3>
                  <p className="text-sm text-gray-600">
                    Download guides, templates, and activities designed for family financial discussions
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Join Parent Workshops</h3>
                  <p className="text-sm text-gray-600">
                    Participate in expert-led sessions on supporting your teen's financial education
                  </p>
                </div>
              </div>
            </div>
            <Button size="lg" className="mt-8 w-fit">
              Create Parent Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>How FinGenius Helps Parents</CardTitle>
                <CardDescription>
                  Our platform is designed to support both teens and their parents in the financial education journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">Parent Dashboard</h3>
                    <p className="text-gray-600 text-sm">
                      Monitor your teen's progress, set goals together, and view their learning achievements
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">Educational Resources</h3>
                    <p className="text-gray-600 text-sm">
                      Access guides, worksheets, and activities designed for parents to use with their teens
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">Expert Workshops</h3>
                    <p className="text-gray-600 text-sm">
                      Join live and recorded sessions with financial education experts and other parents
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="font-bold mb-4">The Parent's Role in Financial Education</h3>
                  <p className="text-gray-700 mb-4">
                    Research consistently shows that parents are the primary influence on their children's financial
                    behaviors. Even if you don't feel confident about your own financial knowledge, your guidance
                    matters.
                  </p>
                  <p className="text-gray-700">
                    FinGenius is designed to support both you and your teen. Our platform provides the structure and
                    content, while you provide the real-world context and reinforcement that makes the learning stick.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border p-6 rounded-lg">
                    <h3 className="font-bold mb-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      What Teens Learn on FinGenius
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Budgeting and saving strategies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Smart spending and comparison shopping</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Banking basics and account management</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Goal setting and tracking progress</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Introduction to investing concepts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border p-6 rounded-lg">
                    <h3 className="font-bold mb-4 flex items-center">
                      <Check className="h-5 w-5 text-blue-500 mr-2" />
                      How Parents Can Reinforce Learning
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Have regular money conversations at home</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Include teens in some family financial decisions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Use allowance as a teaching tool for budgeting</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Help set up and monitor their first accounts</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="ml-2">Celebrate financial milestones together</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Create Parent Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Parent Resources</CardTitle>
                <CardDescription>
                  Download guides, templates, and activities to support your teen's financial education
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm">{resource.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download {resource.type}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>
                  View All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parent Newsletter</CardTitle>
                <CardDescription>Stay updated with the latest resources, tips, and upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 p-6 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Mail className="h-10 w-10 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold mb-1">Monthly Parent Newsletter</h3>
                      <p className="text-gray-600">Our newsletter includes:</p>
                      <ul className="mt-2 space-y-1 text-gray-600">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Age-appropriate money conversation starters</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>New resources and tools for parents</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Upcoming workshop announcements</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Expert tips for teaching financial literacy</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button>Subscribe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Parent Workshops</CardTitle>
                <CardDescription>
                  Join our expert-led sessions to enhance your ability to guide your teen's financial journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {workshops.map((workshop) => (
                    <Card key={workshop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <img
                          src={workshop.image || "/placeholder.svg?height=160&width=320"}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">{workshop.format}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{workshop.description}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Date:</span>
                            <span className="font-medium">{workshop.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time:</span>
                            <span className="font-medium">{workshop.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Presenter:</span>
                            <span className="font-medium">{workshop.presenter}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Past Recordings</Button>
                <Button>View All Workshops</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parent Testimonials</CardTitle>
                <CardDescription>Hear from other parents who have used FinGenius with their teens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Jennifer D.</h3>
                        <p className="text-xs text-gray-500">Parent of 16-year-old</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      "The workshops gave me the confidence to talk about money with my daughter. Now we have regular
                      financial check-ins, and she's already saved $500 toward her college fund!"
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=MT" />
                        <AvatarFallback>MT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Michael T.</h3>
                        <p className="text-xs text-gray-500">Parent of 14-year-old</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      "I was worried about my own financial knowledge, but the resources made it easy to guide my son.
                      The parent dashboard helps me see his progress and celebrate his achievements."
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=SR" />
                        <AvatarFallback>SR</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Sarah R.</h3>
                        <p className="text-xs text-gray-500">Parent of 17-year-old</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      "My daughter is heading to college next year, and FinGenius has given her the confidence to manage
                      her own finances. The budgeting tools and simulations were game-changers for us."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions from parents about teen financial education</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <div className="bg-primary/5 p-4 rounded-lg w-full">
                  <h3 className="font-medium mb-2">Have a question not answered here?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our parent support team is here to help you navigate financial education for your teen.
                  </p>
                  <Button>Contact Parent Support</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
