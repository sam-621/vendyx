import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

import { JwtPayload } from '../jwt.types';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtSecret'
    });
  }

  /**
   * Receives the payload from the token and validate if its data contains a valid customer.
   * Executes after the `guard.canActivate` and before the `guard.handleRequest` method.
   */
  async validate(payload: JwtPayload) {
    const { sub } = payload;

    const customer = await this.prisma.customer.findUnique({ where: { id: sub } });

    if (!customer) {
      // handled by the guard.handleRequest method
      return null;
    }

    return customer;
  }
}
