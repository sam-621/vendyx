import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
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

  async validate(payload: any) {
    const { email } = payload;

    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new GraphQLError('Invalid token', { extensions: { code: 'UNAUTHORIZED' } });
    }

    return user;
  }
}
