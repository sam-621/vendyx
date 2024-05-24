import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AdminErrorCode, AuthenticateResult } from '@/app/api/common';
import { AdminEntity } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { AdminError } from '@/lib/errors';

@Injectable()
export class AdminService {
  constructor(
    private securityService: SecurityService,
    @InjectDataSource() private db: DataSource
  ) {}

  async authenticate(username: string, password: string): Promise<AuthenticateResult> {
    try {
      const admin = await this.db.getRepository(AdminEntity).findOne({ where: { username } });

      if (!admin) {
        throw new AdminError(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
      }

      const passwordsMatch = await this.securityService.compare(password, admin.password);

      if (!passwordsMatch) {
        throw new AdminError(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
      }

      const { accessToken } = await this.securityService.generateToken(admin);

      return {
        authToken: accessToken,
        apiErrors: []
      };
    } catch (error) {
      if (error instanceof AdminError) {
        return {
          apiErrors: [{ code: error.code, message: error.message }]
        };
      }

      throw error;
    }
  }
}
