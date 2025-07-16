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
    level: number;
    avatar: string;
    change: number;
    changeType: "up" | "down";
  }
  
  export interface Achievement {
    level: number;
    value: string;
    label: string;
    color: string;
    count: number;
  }