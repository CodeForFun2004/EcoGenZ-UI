import type { RankingItem } from "../../interfaces";
import { TrendingUpIcon, TrendingDownIcon } from "./IconComponents";

interface RankingsListProps {
  rankings: RankingItem[];
}

export default function RankingsList({ rankings }: RankingsListProps) {
  return (
    <div className="rankings-card">
      {rankings.map((person, index) => (
        <div key={index} className="ranking-item">
          <div className="ranking-left">
            <div className="position">{person.position}</div>
            <img src={person.avatar || "/placeholder.svg"} alt={person.name} className="ranking-avatar" />
            <div className="ranking-info">
              <div className="ranking-name">{person.name}</div>
              <div className="ranking-level">Level {person.level}</div>
            </div>
          </div>

          <div className="ranking-change">
            {person.changeType === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <span className={`change-text ${person.changeType}`}>
              {person.change} from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}