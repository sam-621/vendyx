import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AdminEntity } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { ValidationError } from '@/lib/errors';

@Injectable()
export class AdminService {
  constructor(
    private securityService: SecurityService,
    @InjectDataSource() private db: DataSource,
  ) {}

  async authenticate(username: string, password: string) {
    const admin = await this.db
      .getRepository(AdminEntity)
      .findOne({ where: { username } });

    if (!admin) {
      throw new ValidationError('Invalid username or password');
    }

    const passwordsMatch = await this.securityService.compare(
      password,
      admin.password,
    );

    if (!passwordsMatch) {
      throw new ValidationError('Invalid username or password');
    }

    const { accessToken } = await this.securityService.generateToken(admin);

    return accessToken;
  }
}
