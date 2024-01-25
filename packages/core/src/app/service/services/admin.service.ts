import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminEntity } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { ValidationError } from '@/lib/errors';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private securityService: SecurityService,
  ) {}

  async authenticate(username: string, password: string) {
    const admin = await this.adminRepository.findOne({ where: { username } });

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
