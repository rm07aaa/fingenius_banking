import { Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BlogPostProps {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
}

export default function BlogPost({ title, excerpt, image, author, date, category }: BlogPostProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2">
          <Badge>{category}</Badge>
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{author}</span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Read Article
        </Button>
      </CardFooter>
    </Card>
  )
}
