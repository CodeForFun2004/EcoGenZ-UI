import type { User } from "../auth/authTypes";

export interface Post {
  id: string;
  content: string;
  mediaUrl?: string;
  createdAt: string;
  userId: string;
  user: User;
  comments: any[];
  likes: any[];
  shares: any[];
}
export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}
