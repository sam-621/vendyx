import { type CreatePaymentMethodInput } from '../codegen/graphql';
import {
  CREATE_PAYMENT_METHOD,
  GET_ALL_PAYMENT_METHODS,
  GET_PAYMENT_METHOD,
  REMOVE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD
} from '../operations';
import { fetcher } from './fetcher';

export const PaymentMethodService = {
  Tags: {
    paymentMethods: 'paymentMethods',
    paymentMethod: (id: string) => `paymentMethod-${id}`
  },

  async getAll() {
    const { paymentMethods } = await fetcher(
      GET_ALL_PAYMENT_METHODS,
      {},
      { tags: [PaymentMethodService.Tags.paymentMethods] }
    );

    return paymentMethods;
  },

  async getById(id: string) {
    const { paymentMethod } = await fetcher(
      GET_PAYMENT_METHOD,
      { id },
      { tags: [PaymentMethodService.Tags.paymentMethod(id)] }
    );

    return paymentMethod;
  },

  async create(input: CreatePaymentMethodInput) {
    const { createPaymentMethod } = await fetcher(CREATE_PAYMENT_METHOD, { input });

    return createPaymentMethod;
  },

  async update(id: string, input: CreatePaymentMethodInput) {
    const { updatePaymentMethod } = await fetcher(UPDATE_PAYMENT_METHOD, { id, input });

    return updatePaymentMethod;
  },

  async remove(id: string) {
    const result = await fetcher(REMOVE_PAYMENT_METHOD, { id });

    return result;
  }
};
