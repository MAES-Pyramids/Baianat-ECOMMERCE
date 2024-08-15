import { User } from '@modules/user/models/user.model';

export interface AuthResponse {
  id: number;
  email: string;
  role: string;
}

export const createAuthPayload = (user: User): AuthResponse => ({
  id: user.id,
  email: user.email,
  role: user.role,
});
