import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectDataSource } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';

import { AdminJwtPayload } from './jwt.types';

import { getConfig } from '@/config';
import { AdminEntity } from '@/persistance';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(@InjectDataSource() @InjectDataSource() private db: DataSource) {
    const { jwtSecret } = getConfig().auth;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: AdminJwtPayload) {
    const { username } = payload;

    const user = await this.db.getRepository(AdminEntity).findOne({ where: { username } });

    if (!user) {
      throw new GraphQLError('Invalid token', { extensions: { code: 'UNAUTHORIZED' } });
    }

    return user;
  }
}
