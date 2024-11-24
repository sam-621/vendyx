import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, { args: [, , ctx] }) => ctx.req.user);

export type TCurrentUser = {
  id: string;
  email: string;
  emailVerified: boolean;
};
