import type { RankingItem } from "../../redux/features/achivements/achivementTypes";
import { TrendingUpIcon, TrendingDownIcon } from "./IconComponents";
import { truncateUsername } from "../../utils/textUtils";

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
            <img
              src={person.avatar || "/placeholder.svg"}
              alt={person.name}
              className="ranking-avatar"
            />
            <div className="ranking-info">
              <div className="ranking-name" title={person.name}>
                {truncateUsername(person.name, 18)}
              </div>
              <div className="ranking-level"> {person.level} Points</div>
            </div>
          </div>

          {/* <div className="ranking-change">
            {person.changeType === "up" ? (
              <TrendingUpIcon />
            ) : (
              <TrendingDownIcon />
            )}
            <span className={`change-text ${person.changeType}`}>
              {person.change} from last month
            </span>
          </div> */}
        </div>
      ))}
    </div>
  );
}
