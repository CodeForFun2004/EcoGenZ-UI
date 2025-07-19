export interface Achievement {
  impactPoints: number;
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  achievedAt?: string | null;
  createdAt?: string | null;
  userId?: string | null;
}

export interface AchievementState {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  userAchievements: Achievement[];
}
export interface TopPlayer {
  id: number;
  name: string;
  level: number;
  position: number;
  avatar: string;
  change: number;
}

export interface RankingItem {
  position: number;
  name: string;
  avatar?: string;
  level: number; // Here using impactPoints as level
  change: number; // difference in rank compared to last month
  changeType: "up" | "down" | "same"; // handle trends
}
