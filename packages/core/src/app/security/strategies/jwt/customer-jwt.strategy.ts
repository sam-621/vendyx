import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectDataSource } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';

import { CustomerJwtPayload } from './jwt.types';

import { getConfig } from '@/app/config';
import { CustomerEntity } from '@/app/persistance';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(@InjectDataSource() private db: DataSource) {
    const { jwtSecret } = getConfig().auth;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: CustomerJwtPayload) {
    const { email } = payload;

    const customer = await this.db.getRepository(CustomerEntity).findOne({ where: { email } });

    if (!customer) {
      throw new GraphQLError('Invalid token', { extensions: { code: 'UNAUTHORIZED' } });
    }

    return customer;
  }
}
