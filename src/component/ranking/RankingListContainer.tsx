import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";
import Pagination from "../common/Pagination";
import { truncateUsername } from "../../utils/textUtils";
import UserProfileModal from "./UserProfileModal";
import type { RankingItem } from "../../redux/features/achivements/achivementTypes";
import type { User } from "../../redux/features/auth/authTypes";

export default function RankingsListContainer() {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getuserWithPoint());
  }, [dispatch]);

  const sorted = [...userList].sort((a, b) => (b.impactPoints || 0) - (a.impactPoints || 0));

  // Mock `change` and `changeType` for now
  const rankings: RankingItem[] = sorted.map((u, index) => ({
    position: index + 1,
    name: u.userName,
    avatar: u.profilePhotoUrl,
    level: u.impactPoints || 0,
    change: Math.floor(Math.random() * 10), // You can calculate real values later
    changeType: ["up", "down", "same"][Math.floor(Math.random() * 3)] as
      | "up"
      | "down"
      | "same",
  }));

  // Calculate pagination
  const totalPages = Math.ceil(rankings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rankings.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rankings-card">
          {currentItems.map((person, index) => {
            // Find the original user object for the modal
            const originalUser = sorted.find(u => u.userName === person.name);
            return (
              <div key={index} className="ranking-item">
                <div className="ranking-left">
                  <div className="position">{person.position}</div>
                  <img
                    src={person.avatar || "/placeholder.svg"}
                    alt={person.name}
                    className="ranking-avatar"
                    style={{ cursor: "pointer" }}
                    onClick={() => originalUser && handleAvatarClick(originalUser)}
                  />
                  <div className="ranking-info">
                    <div className="ranking-name" title={person.name}>
                      {truncateUsername(person.name, 18)}
                    </div>
                    <div className="ranking-level"> {person.level} Points</div>
                  </div>
                </div>
              </div>
            );
          })}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
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
