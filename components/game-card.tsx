import { Clock, Award } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface GameCardProps {
  title: string
  description: string
  image: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  points: number
}

export default function GameCard({ title, description, image, difficulty, duration, points }: GameCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <Badge
            className={`
            ${difficulty === "Easy" ? "bg-green-500" : ""}
            ${difficulty === "Medium" ? "bg-yellow-500" : ""}
            ${difficulty === "Hard" ? "bg-red-500" : ""}
          `}
          >
            {difficulty}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{points} points</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Play Now</Button>
      </CardFooter>
    </Card>
  )
}
