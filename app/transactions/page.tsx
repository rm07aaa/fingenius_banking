"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

import Navbar from "@/components/navbar"

export default function TransactionsPage() {
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
          <Badge className="mb-2">MONEY TRACKING</Badge>
          <h1 className="text-4xl font-bold mb-4">Transaction Manager</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your income and expenses to understand your spending habits
          </p>
        </motion.div>

        <Card>\
