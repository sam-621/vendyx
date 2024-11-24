import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '@/persistence/repositories';

import { UserJwtPayload } from './jwt.types';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtSecret'
    });
  }

  /**
   * Receives the payload from the token and validate if its data contains a valid user.
   * Executes after the `guard.canActivate` and before the `guard.handleRequest` method.
   */
  async validate(payload: UserJwtPayload) {
    const { sub } = payload;

    const user = await this.userRepository.findById(sub);

    if (!user) {
      // handled by the guard.handleRequest method
      return null;
    }

    return user;
  }
}
