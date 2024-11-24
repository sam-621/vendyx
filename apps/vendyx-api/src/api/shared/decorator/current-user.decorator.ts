import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, { args: [, , ctx] }) => ctx.req.user);
