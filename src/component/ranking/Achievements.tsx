import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

import {
  fetchAllAchievements,
  fetchAchievementByUserId,
} from "../../redux/features/achivements/achivementThunk";
import { InfoIcon } from "./IconComponents";
import type { Achievement } from "../../redux/features/achivements/achivementTypes";

export default function Achievements() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { achievements, userAchievements, loading } = useSelector(
    (state: RootState) => state.achievements
  );

  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 5;

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchAchievementByUserId(user.userId));
    } else {
      dispatch(fetchAllAchievements());
    }
  }, [dispatch, user]);

  const groupAchievements = (list: Achievement[]) => {
    const grouped = new Map<string, { count: number; item: Achievement }>();

    list.forEach((ach) => {
      if (grouped.has(ach.name)) {
        grouped.get(ach.name)!.count += 1;
      } else {
        grouped.set(ach.name, { count: 1, item: ach });
      }
    });

    return Array.from(grouped.values());
  };

  const displayAchievements = user?.userId
    ? userAchievements
    : achievements.filter(
        (ach) => ach.achievedAt === null && ach.userId === null
      );

  const groupedAchievements = groupAchievements(displayAchievements);
  const visibleAchievements = showAll
    ? groupedAchievements
    : groupedAchievements.slice(0, MAX_VISIBLE);

  return (
    <div className="achievements-card">
      <h4 className="card-title">Achievements</h4>

      {loading && <p>Loading achievements...</p>}

      <div className="achievements-list">
        {visibleAchievements.length === 0 && !loading && (
          <p>No achievements available.</p>
        )}

        {visibleAchievements.map(({ item, count }, index) => (
          <div key={index} className="achievement-item">
            <div className="achievement-left">
              <div className="achievement-icon">
                {item.iconUrl ? <img src={item.iconUrl} alt="icon" /> : "🏆"}
              </div>
              <div className="achievement-info">
                <div className="achievement-level">{item.name}</div>
                <div className="achievement-label">
                  {item.description}
                  <InfoIcon />
                </div>
              </div>
            </div>
            {item.achievedAt && (
              <div className="achievement-count">
                {new Date(item.achievedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showAll && groupedAchievements.length > MAX_VISIBLE && (
        <button
          className="more-achievements"
          onClick={() => setShowAll(true)}
        >
          + {groupedAchievements.length - MAX_VISIBLE} More Achievements
        </button>
      )}
    </div>
  );
}
