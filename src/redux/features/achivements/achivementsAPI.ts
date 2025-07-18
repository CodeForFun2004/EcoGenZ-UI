// src/redux/achievements/achievementsAPI.ts

const ACHIEVEMENT_URL = import.meta.env.VITE_ACHIEVEMENT_URL;

export const fetchAllAchievements = async () => {
  const res = await fetch(`${ACHIEVEMENT_URL}/get-all-achievements`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Fetch achievements failed");

  const json = await res.json();
  return json;
};

export const fetchAchievementByUserId = async (userId: string) => {
  const res = await fetch(`${ACHIEVEMENT_URL}/get-by-user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch user achievements");

  const json = await res.json();
  return json;
};
