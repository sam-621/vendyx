import { ID } from '@/app/persistance';

export type AdminJwtPayload = {
  username: string;
  /**
   * User ID
   */
  sub: ID;
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
