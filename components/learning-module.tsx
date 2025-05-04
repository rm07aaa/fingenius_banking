import type { ReactNode } from "react"
import { ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface LearningModuleProps {
  icon: ReactNode
  title: string
  description: string
  format: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
}

export default function LearningModule({ icon, title, description, format, level, duration }: LearningModuleProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            {format}
          </Badge>
          <Badge
            variant="outline"
            className={`
            ${level === "Beginner" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
            ${level === "Intermediate" ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50" : ""}
            ${level === "Advanced" ? "bg-red-50 text-red-700 hover:bg-red-50" : ""}
          `}
          >
            {level}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
