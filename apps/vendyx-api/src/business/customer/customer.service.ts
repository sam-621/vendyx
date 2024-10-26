import { Inject, Injectable } from '@nestjs/common';

import {
  CreateCustomerInput,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/api/shared';
import { AuthService } from '@/auth';
import { CustomerJwtPayload } from '@/auth/strategies';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';
import { ID } from '@/persistance/types';

import { CustomerFinder } from './customer-finder';
import {
  DisabledCustomer,
  EmailAlreadyExists,
  InvalidAccessToken,
  InvalidCredentials,
  InvalidEmail,
  PasswordsDoNotMatch
} from './customer.errors';
import { clean, validateEmail } from '../shared';

@Injectable()
export class CustomerService extends CustomerFinder {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly authService: AuthService
  ) {
    super(prisma);
  }

  async findById(id: ID) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async findByAccessToken(accessToken: string) {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new InvalidAccessToken();
    }

    return await this.findById(sub);
  }

  async create(input: CreateCustomerInput) {
    if (!validateEmail(input.email)) {
      return new InvalidEmail();
    }

    const customerExists = await this.prisma.customer.findUnique({ where: { email: input.email } });

    // Customer could exist without a password because we save the customer when
    // addCustomerToOrder mutation is called and we don't save the password in that case,
    // so the user can complete the registration later.
    // When trying to create an account and found a customer with the same email
    // we need to verify if the customer has password, if not is just a customer
    // who has bought and now tries to create an account.
    // If the customer found has a password, that means that some other customer
    // already has an account in the store so that is not allowed.
    if (customerExists && customerExists.password) {
      return new EmailAlreadyExists();
    }

    const hashedPassword = await this.authService.hash(input.password);

    return await this.prisma.customer.upsert({
      where: { email: input.email },
      create: {
        ...clean(input),
        password: hashedPassword
      },
      update: {
        ...clean(input),
        password: hashedPassword
      }
    });
  }

  async updateByAccessToken(accessToken: string, input: UpdateCustomerInput) {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new InvalidAccessToken();
    }

    return await this.update(sub, input, true);
  }

  async updateById(id: ID, input: UpdateCustomerInput) {
    return await this.update(id, input, false);
  }

  async updatePassword(accessToken: string, input: UpdateCustomerPasswordInput) {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new InvalidAccessToken();
    }

    if (input.password !== input.newPassword) {
      return new PasswordsDoNotMatch();
    }

    const newPasswordHashed = await this.authService.hash(input.newPassword);

    return await this.prisma.customer.update({
      where: { id: sub },
      data: {
        password: newPasswordHashed
      }
    });
  }

  async generateAccessToken(email: string, password: string) {
    const customer = await this.prisma.customer.findUnique({ where: { email } });

    // Customer exists but has no password because it was created when adding the customer to an order
    // So the customer needs to create an account first to be able to login
    // or just the customer was not found
    if (!customer?.password) {
      return new InvalidCredentials();
    }

    const passwordsMatch = await this.authService.compare(password, customer.password);

    if (!passwordsMatch) {
      return new InvalidCredentials();
    }

    const { accessToken } = await this.authService.generateToken<CustomerJwtPayloadInput>({
      email: customer.email,
      sub: customer.id
    });

    return accessToken;
  }

  /**
   * Updates a customer with the given id.
   *
   * If onlyEnabled is true, the customer will only be updated if it is enabled.
   * Useful for updating a customer in a storefront where the customer must be enabled
   * to be able to execute operations.
   */
  private async update(id: ID, input: UpdateCustomerInput, onlyEnabled: boolean) {
    const customerToUpdate = await this.findByIdOrThrow(id);

    if (onlyEnabled && !customerToUpdate.enabled) {
      return new DisabledCustomer();
    }

    if (input.email) {
      if (!validateEmail(input.email)) {
        return new InvalidEmail();
      }

      const customerWithSameEmail = await this.findByEmailOrThrow(input.email);

      if (customerWithSameEmail && customerWithSameEmail.id !== id) {
        return new EmailAlreadyExists();
      }
    }

    return await this.prisma.customer.update({
      where: { id },
      data: clean(input)
    });
  }

  private async verifyAccessToken(accessToken: string) {
    return await this.authService.decodeAccessToken<CustomerJwtPayloadInput>(accessToken);
  }

  private async findByIdOrThrow(id: ID) {
    return await this.prisma.customer.findUniqueOrThrow({ where: { id } });
  }

  private async findByEmailOrThrow(email: string) {
    return await this.prisma.customer.findUniqueOrThrow({ where: { email } });
  }
}

type CustomerJwtPayloadInput = Pick<CustomerJwtPayload, 'sub' | 'email'>;
