export interface User {
  _id: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  access_token: string;
  user: User; 
}