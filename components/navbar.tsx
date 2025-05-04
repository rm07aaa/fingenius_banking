"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
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
                  className="text-white"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <span className="font-bold text-xl">FinGenius</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="#learn" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
              Learn
            </Link>
            <Link href="#academy" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
              Academy
            </Link>
            <Link href="#games" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
              Games
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="#blog" className="flex w-full">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#parents" className="flex w-full">
                    For Parents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex w-full">
                    Financial Dictionary
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
            <Button size="sm">
              <User className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="#learn"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Learn
              </Link>
              <Link
                href="#academy"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Academy
              </Link>
              <Link
                href="#games"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Games
              </Link>
              <Link
                href="#blog"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="#parents"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                For Parents
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">Guest User</div>
                  <div className="text-sm font-medium text-gray-500">Not logged in</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full mt-2" onClick={() => setIsOpen(false)}>
                  Log In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
