import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreatePaymentMethodInput,
  ListInput,
  PaymentMethodErrorCode,
  UpdatePaymentMethodInput
} from '@/app/api/common';
import { getConfig } from '@/app/config';
import { ID, PaymentMethodEntity } from '@/app/persistance';

@Injectable()
export class PaymentMethodService {
  constructor(private db: DataSource) {}

  /**
   * Find all payment methods
   */
  async find(input?: ListInput & FindInput) {
    return await this.db.getRepository(PaymentMethodEntity).find({
      take: input?.take ?? undefined,
      skip: input?.skip ?? undefined,
      where: { enabled: input?.onlyEnabled || undefined },
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * Find a payment method by id
   */
  async findUnique({ id, onlyEnabled }: FindUniqueInput) {
    return await this.db.getRepository(PaymentMethodEntity).findOne({
      where: { id, enabled: onlyEnabled || undefined }
    });
  }

  /**
   * Create a payment method
   */
  async create(input: CreatePaymentMethodInput) {
    const handlerExists = getConfig().payments.handlers.find(ph => ph.code === input.handler.code);

    if (!handlerExists) {
      return new ErrorResult(
        PaymentMethodErrorCode.PAYMENT_HANDLER_NOT_FOUND,
        'Payment handler not found'
      );
    }

    return this.db.getRepository(PaymentMethodEntity).save(clean(input));
  }

  /**
   * Update a payment method
   */
  async update(id: ID, input: UpdatePaymentMethodInput) {
    const method = await this.findUnique({ id });

    if (!method) {
      return new ErrorResult(
        PaymentMethodErrorCode.PAYMENT_METHOD_NOT_FOUND,
        'Payment method not found'
      );
    }

    const handlerExists = getConfig().payments.handlers.find(ph => ph.code === input.handler?.code);

    if (!handlerExists && input.handler) {
      return new ErrorResult(
        PaymentMethodErrorCode.PAYMENT_HANDLER_NOT_FOUND,
        'Payment handler not found'
      );
    }

    return this.db.getRepository(PaymentMethodEntity).save({ ...method, ...clean(input) });
  }

  /**
   * Remove a payment method
   */
  async remove(id: ID) {
    const method = await this.findUnique({ id });

    if (!method) {
      return new ErrorResult(
        PaymentMethodErrorCode.PAYMENT_METHOD_NOT_FOUND,
        'Payment method not found'
      );
    }

    return this.db.getRepository(PaymentMethodEntity).remove(method);
  }
}

type FindInput = { onlyEnabled?: boolean };
type FindUniqueInput = { id?: ID; onlyEnabled?: boolean };
