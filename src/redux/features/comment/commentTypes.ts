import type { User } from "../auth/authTypes";

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  activityId: string;
  user: {
    id: string;
    email: string;
    profilePhotoUrl?: string;
  } | null;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  selectedComments: Comment | null;
  comment: Comment | null;
}
