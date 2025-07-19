import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { InfoIcon } from "./IconComponents";
import { useMemo } from "react";

export default function LevelProgress() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { achievements, userAchievements } = useSelector(
    (state: RootState) => state.achievements
  );

  const displayAchievements = user?.userId ? userAchievements : achievements;

  const totalCount = displayAchievements.length;

  const { level, percentage } = useMemo(() => {
    let level = 0;
    let percentage = 0;

    if (totalCount >= 20) {
      level = 5;
      percentage = 100;
    } else if (totalCount >= 15) {
      level = 4;
      percentage = ((totalCount - 15) / 5) * 100;
    } else if (totalCount >= 10) {
      level = 3;
      percentage = ((totalCount - 10) / 5) * 100;
    } else if (totalCount >= 5) {
      level = 2;
      percentage = ((totalCount - 5) / 5) * 100;
    } else if (totalCount >= 1) {
      level = 1;
      percentage = (totalCount / 5) * 100;
    }

    return { level, percentage: Math.min(percentage, 100) };
  }, [totalCount]);

  return (
    <div className="progress-card">
      <div className="progress-header">
        <h4 className="card-title">
          Level {level} <InfoIcon />
        </h4>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        <span className="progress-percentage">{Math.round(percentage)}%</span>{" "}
        completed to next level
      </div>
    </div>
  );
}
