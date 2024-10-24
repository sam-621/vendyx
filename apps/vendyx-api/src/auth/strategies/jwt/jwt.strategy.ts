import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '@/persistance/repositories';

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
   * Is executed after the token is decoded and before the guard.handleRequest method.
   */
  async validate(payload: any) {
    const { email } = payload;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // handled by the guard.handleRequest method
      return null;
    }

    return { email: user.email, id: user.id };
  }
}
