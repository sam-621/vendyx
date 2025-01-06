import { ID } from '@/persistence/types/scalars.type';

export type JwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: ID;
  iat: number;
  exp: number;
};
