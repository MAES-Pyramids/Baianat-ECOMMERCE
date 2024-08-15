import { User } from '@modules/user/models/user.model';

export interface AuthPayload {
  id: number;
  email: string;
  role: string;
}

export const createAuthPayload = (user: User): AuthPayload => ({
  id: user.id,
  email: user.email,
  role: user.role,
});
