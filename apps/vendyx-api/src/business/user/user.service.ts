import { Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '@/api/shared';
import { AuthService } from '@/auth';
import { UserJwtPayload } from '@/auth/strategies';
import { UserRepository } from '@/persistance/repositories';

import { EmailAlreadyExists, InvalidCredentials } from './user.errors';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository
  ) {}

  async findByAccessToken(accessToken: string) {
    const payload = await this.authService.decodeAccessToken<UserJwtPayload>(accessToken);

    return this.userRepository.findById(payload.sub);
  }

  async create(input: CreateUserInput) {
    const emailExists = await this.userRepository.findByEmailForAdmin(input.email);

    if (emailExists) {
      return new EmailAlreadyExists();
    }

    const hashedPassword = await this.authService.hash(input.password);

    return await this.userRepository.insert({ email: input.email, password: hashedPassword });
  }

  async update(id: string, input: UpdateUserInput) {
    if (input.email) {
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
}

type UserJwtInput = Pick<UserJwtPayload, 'email' | 'sub'>;
