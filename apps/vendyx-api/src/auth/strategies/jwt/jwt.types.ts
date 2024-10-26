import { ID } from '@/persistance/types';
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

export type CustomerJwtPayload = {
  email: string;
  /**
   * User ID
   */
  sub: ID;
  iat: number;
  exp: number;
};
