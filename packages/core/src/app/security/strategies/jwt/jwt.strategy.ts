import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Payload } from './jwt.types';

import { getConfig } from '@/app/config';
import { AdminEntity } from '@/app/persistance';
import { UnauthorizedError } from '@/lib/errors';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>
  ) {
    const { jwtSecret } = getConfig().auth;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: Payload) {
    const { username } = payload;

    const user = await this.adminRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    return user;
  }
}
