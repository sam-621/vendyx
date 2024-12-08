import { ID } from '@/persistence/types';

export type JwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: ID;
  iat: number;
  exp: number;
};
