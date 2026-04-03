export type AuthDoc = {
  password: string;
  expiresAt: number;
};

export type LoginRequest = {
  userId: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};