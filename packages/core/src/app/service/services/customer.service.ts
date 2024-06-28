import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreateCustomerInput,
  CustomerErrorCode,
  ListInput,
  UpdateCustomerInput
} from '@/app/api/common';
import { CustomerEntity, ID } from '@/app/persistance';

@Injectable()
export class CustomerService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find all customers
   */
  find(input: ListInput) {
    return this.db.getRepository(CustomerEntity).find(clean(input));
  }

  /**
   * Find a customer by id
   */
  findUnique(id: ID) {
    return this.db.getRepository(CustomerEntity).findOne({ where: { id } });
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
    id: ID,
    input: UpdateCustomerInput
  ): Promise<ErrorResult<CustomerErrorCode> | CustomerEntity> {
    const customerToUpdate = await this.findUnique(id);

    if (!customerToUpdate) {
      return new ErrorResult(CustomerErrorCode.CUSTOMER_NOT_FOUND, 'Customer not found');
    }

    return this.db.getRepository(CustomerEntity).save({
      ...customerToUpdate,
      ...clean(input)
    });
  }
}
