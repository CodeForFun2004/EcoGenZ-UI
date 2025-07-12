// types.ts
export interface UserItem {
    id: number;
    name: string;
    level: string; // CHÚ Ý: string (nếu các component dùng string)
    points: number;
    pointChange?: number;
    avatarUrl: string;
    rank: number;
  }
  
  export interface UserDetail {
    id: number;
    name: string;
    level: string;
    progress: number; // 0–100
    achievements: string[]; // emoji hoặc tên badge
    avatarUrl: string;
  }
  