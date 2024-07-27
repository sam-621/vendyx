import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { InvalidCredentialError } from './admin.errors';
import { ErrorResult } from '../utils';

import { AdminErrorCode } from '@/app/api/common';
import { AdminEntity } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { AdminJwtPayload } from '@/app/security/strategies/jwt/jwt.types';

@Injectable()
export class AdminService {
  constructor(
    private securityService: SecurityService,
    @InjectDataSource() private db: DataSource
  ) {}

  async findUnique(input: FindUnique) {
    return this.db.getRepository(AdminEntity).findOne({
      where: {
        ...(input.id && { id: input.id }),
        ...(input.username && { username: input.username })
      }
    });
  }

  /**
   * @description
   * Authenticate an admin comparing password and username, returns access token if successful
   */
  async authenticate(username: string, password: string): Promise<MutationResult> {
    const { admin, error } = await this.validateAdmin(username, password);

    if (error) {
      return error;
    }

    const { accessToken } = await this.generateAdminToken(admin);

    return accessToken;
  }

  private async validateAdmin(username: string, password: string) {
    const admin = await this.findUnique({ username });

    if (!admin) {
      return { error: new InvalidCredentialError() };
    }

    const passwordsMatch = await this.passwordsMatch(password, admin.password);

    if (!passwordsMatch) {
      return { error: new InvalidCredentialError() };
    }

    return { admin };
  }

  private async generateAdminToken(admin: AdminEntity) {
    return this.securityService.generateToken<AdminJwtPayloadInput>({
      sub: admin.id,
      username: admin.username
    });
  }

  private async passwordsMatch(password: string, hashedPassword: string) {
    return this.securityService.compare(password, hashedPassword);
  }
}

type AdminJwtPayloadInput = Pick<AdminJwtPayload, 'sub' | 'username'>;
type MutationResult = ErrorResult<AdminErrorCode> | string;
type FindUnique = { username?: string; id?: string };
