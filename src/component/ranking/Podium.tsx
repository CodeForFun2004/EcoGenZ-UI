import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";
import { truncateUsername } from "../../utils/textUtils";
import UserProfileModal from "./UserProfileModal";
import type { User } from "../../redux/features/auth/authTypes";

export default function Podium() {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getuserWithPoint());
  }, [dispatch]);

  const sortedTopThree = [...userList]
    .sort((a, b) => (b.impactPoints || 0) - (a.impactPoints || 0))
    .slice(0, 3);

  // Rearrange to [second, first, third] if there are 3 players
  const podiumOrder =
    sortedTopThree.length === 3
      ? [sortedTopThree[1], sortedTopThree[0], sortedTopThree[2]]
      : sortedTopThree;

  const handleAvatarClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
                style={{ width: 64, height: 64, borderRadius: "50%", cursor: "pointer" }}
                onClick={() => handleAvatarClick(u)}
              />
              <div className="podium-name" title={u.userName}>
                {truncateUsername(u.userName, 15)}
              </div>
              <div className="podium-points">{u.impactPoints} pts</div>
            </div>
          ))}
        </div>
      )}
      
      <UserProfileModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
