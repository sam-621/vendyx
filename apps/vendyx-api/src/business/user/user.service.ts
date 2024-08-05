import { Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '@/api/shared';
import { AuthService } from '@/auth';
import { UserRepository } from '@/persistance/repositories';

import { EmailAlreadyExists } from './user.errors';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository
  ) {}

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  async create(input: CreateUserInput) {
    const emailExists = await this.userRepository.findByEmail(input.email, true);

    if (emailExists) {
      return new EmailAlreadyExists();
    }

    const hashedPassword = await this.authService.hash(input.password);

    return await this.userRepository.insert({ email: input.email, password: hashedPassword });
  }

  async update(id: string, input: UpdateUserInput) {
    if (input.email) {
      const userWithEmailExists = await this.userRepository.findByEmail(input.email, true);

      if (userWithEmailExists && userWithEmailExists.id !== id) {
        return new EmailAlreadyExists();
      }
    }

    return await this.userRepository.update(id, input);
  }
}
