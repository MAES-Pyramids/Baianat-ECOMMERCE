import { User } from '../types/graphql.schema';

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
