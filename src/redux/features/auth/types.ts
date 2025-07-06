export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    token: string;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  