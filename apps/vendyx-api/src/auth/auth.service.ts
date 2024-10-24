import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateShopApiKey() {
    const rawApiKey = crypto.randomBytes(48).toString('hex');
    console.log({
      rawApiKey
    });

    return this.hash(rawApiKey);
  }

  async generateToken<TPayload extends object>(payload: TPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async decodeAccessToken<TPayload>(token: string) {
    return await this.jwtService.decode<TPayload>(token);
  }

  async hash(str: string) {
    const salt = await this.generateSalt();

    return bcrypt.hash(str, salt);
  }

  async compare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }

  private async generateSalt() {
    return await bcrypt.genSalt();
  }
}
