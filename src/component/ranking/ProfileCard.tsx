// src/components/ProfileCard.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useMemo } from "react";
import { truncateUsername } from "../../utils/textUtils";

export default function ProfileCard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { achievements, userAchievements } = useSelector(
    (state: RootState) => state.achievements
  );

  const displayAchievements = user?.userId ? userAchievements : achievements;

  const level = useMemo(() => {
    const count = displayAchievements.length;

    if (count >= 20) return 5;
    if (count >= 15) return 4;
    if (count >= 10) return 3;
    if (count >= 5) return 2;
    if (count >= 1) return 1;
    return 0;
  }, [displayAchievements]);

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
      <div className="level-badge">Level {level}</div>
      <div className="stars">{renderStars(level)}</div>
    </div>
  );
}
