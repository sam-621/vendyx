import { User } from '@prisma/client';

export type UserJwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: User['id'];
  iat: number;
  exp: number;
};
