import { ID } from '@/app/persistance';

export type Payload = {
  username: string;
  /**
   * User ID
   */
  sub: ID;
  iat: number;
  exp: number;
};
