import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";
import Pagination from "../common/Pagination";
import { truncateUsername } from "../../utils/textUtils";
import type { RankingItem } from "../../redux/features/achivements/achivementTypes";

export default function RankingsListContainer() {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getuserWithPoint());
  }, [dispatch]);

  const sorted = [...userList].sort((a, b) => b.impactPoints - a.impactPoints);

  // Mock `change` and `changeType` for now
  const rankings: RankingItem[] = sorted.map((u, index) => ({
    position: index + 1,
    name: u.userName,
    avatar: u.profilePhotoUrl,
    level: u.impactPoints,
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rankings-card">
          {currentItems.map((person, index) => (
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
            </div>
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
