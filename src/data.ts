import type { TopPlayer, RankingItem, Achievement } from "./interfaces";

export const topThreeData: TopPlayer[] = [
  {
    id: 2,
    name: "John Doe",
    level: 3,
    position: 2,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    change: -2,
  },
  {
    id: 1,
    name: "Rey Mibourne",
    level: 3,
    position: 1,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    change: 5,
  },
  {
    id: 3,
    name: "Augusta Mitchell",
    level: 3,
    position: 3,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    change: 6,
  },
];

export const allRankingsData: RankingItem[] = [
  {
    position: 1,
    name: "Rey Mibourne",
    level: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    change: 5,
    changeType: "up",
  },
  {
    position: 2,
    name: "John Doe",
    level: 3,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    change: 2,
    changeType: "down",
  },
  {
    position: 3,
    name: "Augusta Mitchell",
    level: 3,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    change: 6,
    changeType: "up",
  },
  {
    position: 4,
    name: "Rey Mibourne",
    level: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    change: 2,
    changeType: "up",
  },
];

export const achievementsData: Achievement[] = [
  { level: 1, value: "0.5", label: "Talk to Listen Ratio", color: "blue", count: 1 },
  { level: 3, value: "30", label: "Positive Sentiment", color: "orange", count: 1 },
  { level: 4, value: "60", label: "Number of Questions", color: "teal", count: 2 },
  { level: 2, value: "5", label: "Conversations", color: "purple", count: 1 },
];