import { User } from '@prisma/client';

import { ID } from '@/persistence/types';

export type UserJwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: User['id'];
  iat: number;
  exp: number;
};

export type CustomerJwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: ID;
  iat: number;
  exp: number;
};
