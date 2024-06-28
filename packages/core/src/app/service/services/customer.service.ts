import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreateCustomerInput,
  CustomerErrorCode,
  ListInput,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/app/api/common';
import { CustomerEntity, ID } from '@/app/persistance';
import { SecurityService } from '@/app/security';
import { CustomerJwtPayload } from '@/app/security/strategies/jwt/jwt.types';

@Injectable()
export class CustomerService {
  constructor(
    @InjectDataSource() private db: DataSource,
    private readonly securityService: SecurityService
  ) {}

  /**
   * Find all customers
   */
  find(input: ListInput) {
    return this.db.getRepository(CustomerEntity).find(clean(input));
  }

  /**
   * Find a customer by id
   */
  async findUnique(id: ID) {
    return await this.db.getRepository(CustomerEntity).findOne({ where: { id } });
  }

  /**
   * Find a customer by access token
   */
  async findByAccessToken(accessToken: string) {
    const { sub } = await this.verifyAccessToken(accessToken);

    if (!sub) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    return await this.findUnique(sub);
  }

  /**
   * Create a new customer
   */
  async create(
    input: CreateCustomerInput
  ): Promise<ErrorResult<CustomerErrorCode> | CustomerEntity> {
    return this.db.getRepository(CustomerEntity).save(clean(input));
  }

  /**
   * Update a customer by the given id
   */
  async update(
    accessToken: string,
    input: UpdateCustomerInput
  ): Promise<ErrorResult<CustomerErrorCode> | CustomerEntity> {
    const { email } = await this.verifyAccessToken(accessToken);

    if (!email) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    const customerToUpdate = await this.db
      .getRepository(CustomerEntity)
      .findOne({ where: { email } });

    if (!customerToUpdate) {
      return new ErrorResult(CustomerErrorCode.CUSTOMER_NOT_FOUND, 'Customer not found');
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
  async updatePassword(token: string, input: UpdateCustomerPasswordInput) {
    const { email } = await this.verifyAccessToken(token);

    if (!email) {
      return new ErrorResult(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
    }

    const customerToUpdate = await this.db
      .getRepository(CustomerEntity)
      .findOne({ where: { email } });

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
  async generateCustomerAccessToken(email: string, password: string) {
    const customer = await this.db.getRepository(CustomerEntity).findOne({ where: { email } });

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

type CustomerJwtPayloadInput = Pick<CustomerJwtPayload, 'sub' | 'email'>;
