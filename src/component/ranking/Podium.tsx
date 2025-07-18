import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";

export default function Podium() {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getuserWithPoint());
  }, [dispatch]);

  const sortedTopThree = [...userList]
    .sort((a, b) => b.impactPoints - a.impactPoints)
    .slice(0, 3);

  // Rearrange to [second, first, third] if there are 3 players
  const podiumOrder =
    sortedTopThree.length === 3
      ? [sortedTopThree[1], sortedTopThree[0], sortedTopThree[2]]
      : sortedTopThree;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top 3 Players</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="podium">
          {podiumOrder.map((u, idx) => (
            <div
              key={u.userId || idx}
              className={`podium-place place-${idx + 1}`}
            >
              <img
                src={u.profilePhotoUrl}
                alt={u.userName}
                className="podium-avatar"
                style={{ width: 64, height: 64, borderRadius: "50%" }}
              />
              <div className="podium-name">{u.userName}</div>
              <div className="podium-points">{u.impactPoints} pts</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
