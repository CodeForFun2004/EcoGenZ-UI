// src/components/ProfileCard.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useMemo } from "react";
import { truncateUsername } from "../../utils/textUtils";
import { InfoIcon } from "./IconComponents";
import LevelProgress from "./LevelProgress";

export default function ProfileCard() {
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

  const renderStars = (level: number) =>
    Array.from({ length: level }, (_, i) => <span key={i}>★</span>);

  return (
    <div className="profile-card">
      <img
        src={
          user?.profilePhotoUrl ??
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
        }
        alt={user?.userName ?? "Guest"}
        className="profile-avatar"
      />
      <h3 className="profile-name" title={user?.userName ?? "Guest"}>
        {truncateUsername(user?.userName ?? "Guest", 20)}
      </h3>

      <div className="level-badge">
        Level {level} <InfoIcon />
      </div>

      <div className="stars">{renderStars(level)}</div>

      <LevelProgress />
    </div>
  );
}
