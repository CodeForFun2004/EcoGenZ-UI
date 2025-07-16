import type { TopPlayer } from "../../interfaces";

interface PodiumProps {
  topThree: TopPlayer[];
}

export default function Podium({ topThree }: PodiumProps) {
  // Assuming topThree is always sorted as 2nd, 1st, 3rd as per original data
  const secondPlace = topThree[0];
  const firstPlace = topThree[1];
  const thirdPlace = topThree[2];

  return (
    <div className="podium-card">
      <div className="podium">
        {/* 2nd Place */}
        {secondPlace && (
          <div className="podium-person second">
            <img
              src={secondPlace.avatar || "/placeholder.svg"}
              alt={secondPlace.name}
              className="podium-avatar"
            />
            <div className="podium-name">{secondPlace.name}</div>
            <div className="podium-level">Level {secondPlace.level}</div>
            <div className="podium-number">2</div>
          </div>
        )}

        {/* 1st Place */}
        {firstPlace && (
          <div className="podium-person first">
            <img
              src={firstPlace.avatar || "/placeholder.svg"}
              alt={firstPlace.name}
              className="podium-avatar large"
            />
            <div className="podium-name large">{firstPlace.name}</div>
            <div className="podium-level">Level {firstPlace.level}</div>
            <div className="podium-number gold">1</div>
          </div>
        )}

        {/* 3rd Place */}
        {thirdPlace && (
          <div className="podium-person third">
            <img
              src={thirdPlace.avatar || "/placeholder.svg"}
              alt={thirdPlace.name}
              className="podium-avatar"
            />
            <div className="podium-name">{thirdPlace.name}</div>
            <div className="podium-level">Level {thirdPlace.level}</div>
            <div className="podium-number">3</div>
          </div>
        )}
      </div>
    </div>
  );
}