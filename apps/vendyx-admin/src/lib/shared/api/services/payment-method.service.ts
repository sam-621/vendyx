import { getFragmentData } from '../codegen';
import { type CreatePaymentMethodInput } from '../codegen/graphql';
import {
  COMMON_PAYMENT_INTEGRATION_FRAGMENT,
  COMMON_PAYMENT_METHOD_FRAGMENT,
  CREATE_PAYMENT_METHOD,
  GET_ALL_PAYMENT_INTEGRATIONS,
  GET_ALL_PAYMENT_METHODS,
  GET_PAYMENT_METHOD,
  REMOVE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD
} from '../operations';
import { fetcher } from './fetcher';

export const PaymentMethodService = {
  Tags: {
    methods: 'methods',
    method: (id: string) => `method-${id}`,
    integrations: 'integrations'
  },

  async getAll() {
    const result = await fetcher(
      GET_ALL_PAYMENT_METHODS,
      {},
      { tags: [PaymentMethodService.Tags.methods] }
    );

    const paymentMethods = getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, result.paymentMethods);

    return paymentMethods;
  },

  async getAllIntegrations() {
    const result = await fetcher(
      GET_ALL_PAYMENT_INTEGRATIONS,
      {},
      { tags: [PaymentMethodService.Tags.integrations] }
    );

    const paymentIntegrations = getFragmentData(
      COMMON_PAYMENT_INTEGRATION_FRAGMENT,
      result.paymentIntegrations
    );

    return paymentIntegrations;
  },

  async getById(id: string) {
    const result = await fetcher(
      GET_PAYMENT_METHOD,
      { id },
      { tags: [PaymentMethodService.Tags.method(id)] }
    );

    const paymentMethod = getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, result.paymentMethod);

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
