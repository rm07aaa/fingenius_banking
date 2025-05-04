import type { ReactNode } from "react"
import { Progress } from "@/components/ui/progress"

interface FinancialGoalProps {
  title: string
  icon: ReactNode
  current: number
  target: number
  dueDate: string
}

export default function FinancialGoal({ title, icon, current, target, dueDate }: FinancialGoalProps) {
  const percentage = Math.round((current / target) * 100)

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{title}</h4>
            <span className="text-sm text-gray-500">Due: {dueDate}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">${current} saved</span>
          <span className="text-gray-500">Goal: ${target}</span>
        </div>
        <Progress value={percentage} className="h-2" />
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">{percentage}% complete</div>
          <div className="text-xs font-medium text-primary">${target - current} to go</div>
        </div>
      </div>
    </div>
  )
}
