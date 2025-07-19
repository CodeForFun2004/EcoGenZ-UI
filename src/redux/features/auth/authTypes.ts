export interface User {
  userId: string;
  userName: string;
  email: string;
  profilePhotoUrl?: string;
  token: string;
  impactPoints: number;
  role: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  usersById: { [userId: string]: User };
  userList: User[];
}

export interface FormSignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
