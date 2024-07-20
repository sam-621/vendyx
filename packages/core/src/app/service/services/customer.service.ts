import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Not } from 'typeorm';

import { ErrorResult, validateEmail } from '../utils';

import {
  CreateCustomerInput,
  CustomerErrorCode,
  ListInput,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/app/api/common';
import { AddressEntity, CustomerEntity, ID, OrderEntity, OrderState } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { CustomerJwtPayload } from '@/app/security/strategies/jwt/jwt.types';

@Injectable()
export class CustomerService {
  constructor(private db: DataSource, private readonly securityService: SecurityService) {}

  /**
   * Find all customers
   */
  find(input: ListInput) {
    return this.db.getRepository(CustomerEntity).find({
      ...clean(input),
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Find a customer by id or email, if none is provided, throw an error. By default, only enabled customers are returned
   */
  async findUnique({ id, email, onlyEnabled = true }: FindUniqueInput) {
    if (email) {
      return await this.db
        .getRepository(CustomerEntity)
        .findOne({ where: { email, enabled: onlyEnabled || undefined } });
    }

    if (id) {
      return await this.db
        .getRepository(CustomerEntity)
        .findOne({ where: { id, enabled: onlyEnabled || undefined } });
    }

    throw new Error('Should provide either id or email to find a customer');
  }

  /**
   * Find a customer by access token
   */
  async findByAccessToken(accessToken: string) {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    return await this.findUnique({ id: sub });
  }

  /**
   * Find a customer's orders by customer id
   */
  async findOrders(id: ID, input: ListInput) {
    const result = await this.db.getRepository(OrderEntity).find({
      // TODO: Add state filter in api
      where: { customer: { id }, state: Not(OrderState.MODIFYING) },
      ...clean(input),
      order: { createdAt: 'DESC' }
    });

    return result;
  }

  /**
   * Find a customer's addresses by customer id
   */
  async findAddresses(id: ID, input: ListInput) {
    const result = this.db.getRepository(AddressEntity).find({
      where: { customer: { id } },
      ...clean(input)
    });

    return result;
  }

  /**
   * Create a new customer
   */
  async create(input: CreateCustomerInput): CustomerMutationResult {
    if (!validateEmail(input.email)) {
      return new ErrorResult(CustomerErrorCode.INVALID_EMAIL, 'Invalid email');
    }

    const customerExists = await this.findUnique({ email: input.email, onlyEnabled: false });

    // Customer could exist without a password because we save the customer when
    // addCustomerToOrder mutation is called and we don't save the password in that case,
    // so the user can complete the registration later.
    // When trying to create an account and found a customer with the same email
    // we need to verify if the customer has password, if not is just a customer
    // who has bought and now tries to create an account so that is allowed.
    // If the customer found has a password, that means that some other customer
    // already has an account in the store so that is not allowed.
    if (customerExists && customerExists.password) {
      return new ErrorResult(
        CustomerErrorCode.EMAIL_ALREADY_EXISTS,
        'Customer with that email already exists'
      );
    }

    const hashedPassword = await this.securityService.hash(input.password);

    return this.db.getRepository(CustomerEntity).save({
      ...customerExists,
      ...clean(input),
      password: hashedPassword
    });
  }

  /**
   * Update a customer by the given id
   */
  async updateByAccessToken(
    accessToken: string,
    input: UpdateCustomerInput
  ): CustomerMutationResult {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    return await this.update(sub, input, true);
  }

  /**
   * Update a customer by the given id
   */
  async updateById(id: ID, input: UpdateCustomerInput): CustomerMutationResult {
    return this.update(id, input, false);
  }

  /**
   * Update a customer by the given id
   *
   * @param onlyEnabled - if true, only enabled customers are updated, if false, all customers are updated
   */
  private async update(
    id: ID,
    input: UpdateCustomerInput,
    onlyEnabled: boolean
  ): CustomerMutationResult {
    const customerToUpdate = await this.findUnique({ id, onlyEnabled: onlyEnabled });

    if (!customerToUpdate) {
      return new ErrorResult(CustomerErrorCode.CUSTOMER_NOT_FOUND, 'Customer not found');
    }

    if (input.email) {
      if (!validateEmail(input.email)) {
        return new ErrorResult(CustomerErrorCode.INVALID_EMAIL, 'Invalid email');
      }

      const customerExists = await this.findUnique({ email: input.email, onlyEnabled: false });

      if (customerExists && customerExists.id !== id) {
        return new ErrorResult(
          CustomerErrorCode.EMAIL_ALREADY_EXISTS,
          'Customer with that email already exists'
        );
      }
    }

    return this.db.getRepository(CustomerEntity).save({
      ...customerToUpdate,
      ...clean(input)
    });
  }

  /**
   * Update customer's password
   *
   * @description
   * 1. Verify the access token
   * 2. Check if the customer exists
   * 3. Check if the new password is the same as the old password
   * 4. Hash the new password
   * 5. Update the customer's password
   */
  async updatePassword(token: string, input: UpdateCustomerPasswordInput): CustomerMutationResult {
    const { sub } = await this.verifyAccessToken(token);

    if (!sub) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    const customerToUpdate = await this.findUnique({ id: sub });

    if (!customerToUpdate) {
      return new ErrorResult(CustomerErrorCode.CUSTOMER_NOT_FOUND, 'Customer not found');
    }

    if (input.password !== input.newPassword) {
      return new ErrorResult(CustomerErrorCode.PASSWORDS_DO_NOT_MATCH, 'Passwords do not match');
    }

    const hashedNewPassword = await this.securityService.hash(input.newPassword);

    return this.db.getRepository(CustomerEntity).save({
      ...customerToUpdate,
      password: hashedNewPassword
    });
  }

  /**
   * Generate a customer access token
   *
   * @description
   * 1. Find the customer by email
   * 2. Compare the password
   * 3. Generate a new access token
   */
  async generateCustomerAccessToken(
    email: string,
    password: string
  ): CustomerMutationResult<string> {
    const customer = await this.findUnique({ email });

    if (!customer) {
      return new ErrorResult(CustomerErrorCode.INVALID_CREDENTIALS, 'Invalid email or password');
    }

    const passwordsMatch = await this.securityService.compare(password, customer.password);

    if (!passwordsMatch) {
      return new ErrorResult(CustomerErrorCode.INVALID_CREDENTIALS, 'Invalid email or password');
    }

    const { accessToken } = await this.securityService.generateToken<CustomerJwtPayloadInput>({
      email: customer.email,
      sub: customer.id
    });

    return accessToken;
  }

  private async verifyAccessToken(accessToken: string) {
    return await this.securityService.decodeAccessToken<CustomerJwtPayload>(accessToken);
  }
}

type CustomerMutationResult<R = CustomerEntity> = Promise<ErrorResult<CustomerErrorCode> | R>;

type CustomerJwtPayloadInput = Pick<CustomerJwtPayload, 'sub' | 'email'>;
type FindUniqueInput = { id?: ID; email?: string; onlyEnabled?: boolean };
