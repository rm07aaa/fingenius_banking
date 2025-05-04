import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const leaderboardData = [
  {
    id: 1,
    name: "MoneyMaster2010",
    score: 1250,
    avatar: "/images/avatars/avatar1.png",
    rank: 1,
  },
  {
    id: 2,
    name: "FinanceKid",
    score: 1120,
    avatar: "/images/avatars/avatar2.png",
    rank: 2,
  },
  {
    id: 3,
    name: "SaverQueen",
    score: 980,
    avatar: "/images/avatars/avatar3.png",
    rank: 3,
  },
  {
    id: 4,
    name: "BudgetBoss",
    score: 875,
    avatar: "/images/avatars/avatar4.png",
    rank: 4,
  },
  {
    id: 5,
    name: "CoinCollector",
    score: 820,
    avatar: "/images/avatars/avatar5.png",
    rank: 5,
  },
  {
    id: 6,
    name: "MoneyWizard",
    score: 790,
    avatar: "/images/avatars/avatar6.png",
    rank: 6,
  },
  {
    id: 7,
    name: "InvestorPro",
    score: 760,
    avatar: "/images/avatars/avatar7.png",
    rank: 7,
  },
  {
    id: 8,
    name: "PiggyBanker",
    score: 730,
    avatar: "/images/avatars/avatar8.png",
    rank: 8,
  },
  {
    id: 9,
    name: "WealthBuilder",
    score: 710,
    avatar: "/images/avatars/avatar9.png",
    rank: 9,
  },
  {
    id: 10,
    name: "FinanceFuture",
    score: 690,
    avatar: "/images/avatars/avatar10.png",
    rank: 10,
  },
]

export default function LeaderboardTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Rank</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Player</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player) => (
            <tr key={player.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                {player.rank <= 3 ? (
                  <Badge
                    className={`
                    ${player.rank === 1 ? "bg-yellow-500" : ""}
                    ${player.rank === 2 ? "bg-gray-400" : ""}
                    ${player.rank === 3 ? "bg-amber-700" : ""}
                  `}
                  >
                    #{player.rank}
                  </Badge>
                ) : (
                  <span className="text-gray-500">#{player.rank}</span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right font-bold">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
