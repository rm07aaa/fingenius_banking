"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Making <span className="text-primary">Financial Education</span> Fun for Teens
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Learn essential money skills through interactive games, challenges, and personalized guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/financial-simulator">
                <Button size="lg" variant="outline" className="px-8">
                  Try Simulator
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                <span className="font-medium">1,000+</span> teens learning
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://i.pinimg.com/736x/86/9b/bb/869bbba355843724dfd3c43429ae3d2c.jpg"
                alt="Financial Education Platform"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-20 left-10 w-16 h-16 bg-yellow-100 rounded-full opacity-70"></div>
      <div className="hidden lg:block absolute bottom-20 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-70"></div>
    </section>
  )
}
