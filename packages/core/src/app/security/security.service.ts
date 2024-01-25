import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminEntity } from '../persistance';

@Injectable()
export class SecurityService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(admin: AdminEntity) {
    const payload = { username: admin.username, sub: admin.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
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
