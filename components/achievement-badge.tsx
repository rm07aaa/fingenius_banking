import type { ReactNode } from "react"

interface AchievementBadgeProps {
  icon: ReactNode
  name: string
  earned: boolean
}

export default function AchievementBadge({ icon, name, earned }: AchievementBadgeProps) {
  return (
    <div
      className={`
      flex flex-col items-center p-3 rounded-lg text-center
      ${earned ? "bg-primary/10" : "bg-gray-100 opacity-60"}
    `}
    >
      <div
        className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-2
        ${earned ? "bg-primary/20 text-primary" : "bg-gray-200 text-gray-400"}
      `}
      >
        {icon}
      </div>
      <span className={`text-xs font-medium ${earned ? "text-primary" : "text-gray-500"}`}>{name}</span>
    </div>
  )
}
