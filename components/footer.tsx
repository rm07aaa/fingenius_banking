import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
              <span className="font-bold text-xl text-white">FinGenius</span>
            </div>
            <p className="text-sm mb-6">
              Making financial education fun and accessible for teenagers. Learn essential money skills through
              interactive games and challenges.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#learn" className="hover:text-primary transition-colors">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="#academy" className="hover:text-primary transition-colors">
                  Financial Academy
                </Link>
              </li>
              <li>
                <Link href="#games" className="hover:text-primary transition-colors">
                  Games & Challenges
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#parents" className="hover:text-primary transition-colors">
                  For Parents & Teachers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Financial Dictionary
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Get the latest financial tips and updates</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 FinGenius. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
