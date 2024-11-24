import { Inject, Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '@/api/shared';
import { AuthService } from '@/auth';
import { UserJwtPayload } from '@/auth/strategies';
import { EventBusService } from '@/event-bus';
import { UserRegisteredEvent } from '@/event-bus/events';
import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '@/persistence/prisma-clients';
import { UserRepository } from '@/persistence/repositories';
import { ID } from '@/persistence/types';

import {
  EmailAlreadyExists,
  InvalidCredentials,
  InvalidEmail,
  PasswordInvalidLength
} from './user.errors';
import { validateEmail } from '../shared';

@Injectable()
export class UserService {
  constructor(
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBusService
  ) {}

  async findByAccessToken(accessToken: string) {
    const payload = await this.authService.decodeAccessToken<UserJwtPayload>(accessToken);

    return this.userRepository.findById(payload.sub);
  }

  async create(input: CreateUserInput) {
    if (!validateEmail(input.email)) {
      return new InvalidEmail();
    }

    if (input.password.length < 6) {
      return new PasswordInvalidLength();
    }

    const emailExists = await this.userRepository.findByEmailForAdmin(input.email);

    if (emailExists) {
      return new EmailAlreadyExists();
    }

    const hashedPassword = await this.authService.hash(input.password);

    const user = await this.userRepository.insert({ email: input.email, password: hashedPassword });

    this.eventBus.emit(new UserRegisteredEvent({ id: user.id, email: user.email }));

    return user;
  }

  async update(id: string, input: UpdateUserInput) {
    if (input.email) {
      if (!validateEmail(input.email)) {
        return new InvalidEmail();
      }

      const userWithEmailExists = await this.userRepository.findByEmailForAdmin(input.email);

      if (userWithEmailExists && userWithEmailExists.id !== id) {
        return new EmailAlreadyExists();
      }
    }

    return await this.userRepository.update(id, input);
  }

  async generateAccessToken(email: string, password: string) {
    const user = await this.userRepository.findByEmailForAdmin(email);

    if (!user) {
      return new InvalidCredentials();
    }

    const passwordMatch = await this.authService.compare(password, user.password);

    if (!passwordMatch) {
      return new InvalidCredentials();
    }

    const { accessToken } = await this.authService.generateToken<UserJwtInput>({
      email: user.email,
      sub: user.id
    });

    return accessToken;
  }

  async generateOtp(userId: ID) {
    try {
      const MAX_ATTEMPTS = 3;
      let attempts = 0;
      let isUnique = false;
      let otp: string | null = null;

      do {
        otp = this.authService.generateOtp();

        const otpExists = await this.prismaForAdmin.otp.findUnique({ where: { otp } });

        if (!otpExists) {
          isUnique = true;
        }

        attempts++;
      } while (attempts < MAX_ATTEMPTS && !isUnique);

      if (!isUnique) {
        return null;
      }

      const EXPIRES_AT = new Date(Date.now() + 15 * 60 * 1000);

      await this.prismaForAdmin.otp.create({
        data: {
          userId,
          otp,
          expiresAt: EXPIRES_AT
        }
      });

      return otp;
    } catch (error) {
      return null;
    }
  }
}

type UserJwtInput = Pick<UserJwtPayload, 'email' | 'sub'>;
