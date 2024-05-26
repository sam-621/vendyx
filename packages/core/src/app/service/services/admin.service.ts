import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import { AdminErrorCode } from '@/app/api/common';
import { AdminEntity } from '@/app/persistance';
import { SecurityService } from '@/app/security';

@Injectable()
export class AdminService {
  constructor(
    private securityService: SecurityService,
    @InjectDataSource() private db: DataSource
  ) {}

  /**
   * Authenticates an admin comparing password and username, returns access token if successful
   * @param username admin username to authenticate
   * @param password admin password to authenticate
   * @returns Error result or accessToken
   */
  async authenticate(
    username: string,
    password: string
  ): Promise<ErrorResult<AdminErrorCode> | string> {
    const admin = await this.db.getRepository(AdminEntity).findOne({ where: { username } });

    if (!admin) {
      return new ErrorResult(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
    }

    const passwordsMatch = await this.securityService.compare(password, admin.password);

    if (!passwordsMatch) {
      return new ErrorResult(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
    }

    const { accessToken } = await this.securityService.generateToken(admin);

    return accessToken;
  }
}
