export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserResponse {
  success: true;
  data: {
    user: User;
  };
  message: string;
}
