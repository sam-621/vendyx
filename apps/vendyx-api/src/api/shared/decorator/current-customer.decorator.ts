import { createParamDecorator } from '@nestjs/common';
import { Customer } from 'prisma/prisma-client';

export const CurrentCustomer = createParamDecorator((_, { args: [, , ctx] }) => ctx.req.user);

export type TCurrentCustomer = Pick<Customer, 'id' | 'email' | 'enabled'>;
