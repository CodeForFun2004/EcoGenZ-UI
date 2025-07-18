import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";
import RankingsList from "./RankingsList";
import type { RankingItem } from "../../redux/features/achivements/achivementTypes";

export default function RankingsListContainer() {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);

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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      {loading ? <p>Loading...</p> : <RankingsList rankings={rankings} />}
    </div>
  );
}
