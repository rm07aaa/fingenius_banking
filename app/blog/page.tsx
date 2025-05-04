"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogPost from "@/components/blog-post"

// Blog post data
const blogPosts = [
  {
    id: "1",
    title: "10 Money Habits Every Teen Should Develop",
    excerpt:
      "Building good financial habits early can set you up for a lifetime of financial success. Here are the top habits to start now.",
    image: "/images/blog-habits.png",
    author: "Emma Johnson",
    date: "May 2, 2025",
    category: "Habits",
    featured: true,
    tags: ["Habits", "Saving", "Budgeting"],
  },
  {
    id: "2",
    title: "Understanding Your First Paycheck: Taxes Explained",
    excerpt:
      "Got your first job? Learn what all those deductions on your paycheck mean and why understanding taxes is important.",
    image: "/images/blog-paycheck.png",
    author: "Michael Chen",
    date: "April 28, 2025",
    category: "Income",
    featured: false,
    tags: ["Income", "Taxes", "Jobs"],
  },
  {
    id: "3",
    title: "Saving for College: Start Early, Start Small",
    excerpt:
      "College costs are rising, but starting to save even small amounts during your teen years can make a big difference.",
    image: "/images/blog-college.png",
    author: "Sophia Rodriguez",
    date: "April 20, 2025",
    category: "Education",
    featured: true,
    tags: ["College", "Saving", "Education"],
  },
  {
    id: "4",
    title: "The Psychology of Spending: Why We Buy What We Buy",
    excerpt: "Understanding the psychological triggers behind spending can help you make better financial decisions.",
    image: "/images/blog-psychology.png",
    author: "Dr. James Wilson",
    date: "April 15, 2025",
    category: "Psychology",
    featured: false,
    tags: ["Psychology", "Spending", "Habits"],
  },
  {
    id: "5",
    title: "Investing 101: What Teens Need to Know",
    excerpt:
      "It's never too early to learn about investing. This beginner's guide explains the basics in teen-friendly terms.",
    image: "/images/blog-investing.png",
    author: "Emma Johnson",
    date: "April 10, 2025",
    category: "Investing",
    featured: true,
    tags: ["Investing", "Stocks", "Future"],
  },
  {
    id: "6",
    title: "Digital Money: Understanding Cryptocurrency",
    excerpt:
      "What is cryptocurrency and should teens be interested? A simple explanation of Bitcoin and blockchain technology.",
    image: "/images/blog-crypto.png",
    author: "Alex Thompson",
    date: "April 5, 2025",
    category: "Technology",
    featured: false,
    tags: ["Cryptocurrency", "Technology", "Digital"],
  },
  {
    id: "7",
    title: "Summer Jobs: Finding Work That Pays and Teaches",
    excerpt: "Summer jobs can provide both income and valuable life skills. Here's how to find the right opportunity.",
    image: "/images/blog-summer-jobs.png",
    author: "Michael Chen",
    date: "March 30, 2025",
    category: "Income",
    featured: false,
    tags: ["Jobs", "Income", "Summer"],
  },
  {
    id: "8",
    title: "The True Cost of Car Ownership for Teens",
    excerpt: "Dreaming of your first car? Understand all the costs involved before making this major purchase.",
    image: "/images/blog-car.png",
    author: "Sophia Rodriguez",
    date: "March 25, 2025",
    category: "Spending",
    featured: false,
    tags: ["Cars", "Expenses", "Transportation"],
  },
]

// Categories
const categories = ["All", "Habits", "Income", "Education", "Psychology", "Investing", "Technology", "Spending"]

// Popular tags
const popularTags = ["Saving", "Budgeting", "Investing", "College", "Jobs", "Technology", "Habits"]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter posts based on category and search term
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && (searchTerm === "" || matchesSearch)
  })

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured)

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
          <Badge className="mb-2">FINANCIAL INSIGHTS</Badge>
          <h1 className="text-4xl font-bold mb-4">FinGenius Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover articles, tips, and insights to boost your financial knowledge
          </p>
        </motion.div>

        {/* Featured Posts Slider */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge>{post.category}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${post.author.charAt(0)}`} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group">
                    Read Article
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <h3 className="font-bold">Categories</h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <h3 className="font-bold">Popular Tags</h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <h3 className="font-bold">Subscribe to Newsletter</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest financial tips and articles delivered to your inbox.
                </p>
                <Input placeholder="Your email address" className="mb-2" />
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="latest" className="w-full mb-8">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogPost
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image || "/placeholder.svg?height=200&width=400"}
                    author={post.author}
                    date={post.date}
                    category={post.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Articles Found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any articles matching your search criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setActiveCategory("All")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button size="lg">
                  Load More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
