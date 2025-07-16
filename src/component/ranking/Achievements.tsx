import type { Achievement } from "../../interfaces";
import { InfoIcon } from "./IconComponents";

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="achievements-card">
      <h4 className="card-title">Achievements</h4>
      <div className="achievements-list">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <div className="achievement-left">
              <div className={`achievement-icon ${achievement.color}`}>{achievement.value}</div>
              <div className="achievement-info">
                <div className="achievement-level">Level {achievement.level}</div>
                <div className="achievement-label">
                  {achievement.label}
                  <InfoIcon />
                </div>
              </div>
            </div>
            <div className="achievement-count">{achievement.count}</div>
          </div>
        ))}
      </div>

      <button className="more-achievements">+ 5 More Achievements</button>
    </div>
  );
}