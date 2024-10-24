import { Injectable } from '@nestjs/common';

import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from '@/api/shared';
import { PaymentMethodRepository } from '@/persistance/repositories';

import { clean } from '../shared';

// TODO: Handle errors
// - Not more than 1 payment method with the same integration
@Injectable()
export class PaymentMethodService {
  constructor(private readonly repository: PaymentMethodRepository) {}

  find() {
    return this.repository.find();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  findIntegrations() {
    return this.repository.findIntegrations();
  }

  async create(input: CreatePaymentMethodInput) {
    const result = await this.repository.insert({
      enabled: input.enabled ?? undefined,
      paymentIntegration: { connect: { id: input.integrationId } },
      integrationMetadata: input.integrationMetadata
    });

    return this.findById(result.id);
  }

  async update(id: string, input: UpdatePaymentMethodInput) {
    const result = await this.repository.update(id, {
      ...clean(input)
    });

    return this.findById(result.id);
  }

  async remove(id: string) {
    await this.repository.remove(id);
    return true;
  }
}
