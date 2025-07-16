export interface User {
  userId: string;
  Username: string;
  email: string;
  profilePhotoUrl?: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
