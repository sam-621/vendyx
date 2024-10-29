import { getFragmentData } from '../codegen';
import { type CreatePaymentMethodInput, type UpdatePaymentMethodInput } from '../codegen/graphql';
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
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const PaymentMethodService = {
  Tags: {
    methods: 'methods',
    method: (id: string) => `method-${id}`,
    integrations: 'integrations'
  },

  async getAll() {
    const result = await serviceGqlFetcher(
      GET_ALL_PAYMENT_METHODS,
      {},
      { tags: [PaymentMethodService.Tags.methods] }
    );

    const paymentMethods = getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, result.paymentMethods);

    return paymentMethods;
  },

  async getAllIntegrations() {
    const result = await serviceGqlFetcher(
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
    const result = await serviceGqlFetcher(
      GET_PAYMENT_METHOD,
      { id },
      { tags: [PaymentMethodService.Tags.method(id)] }
    );

    const paymentMethod = getFragmentData(COMMON_PAYMENT_METHOD_FRAGMENT, result.paymentMethod);

    return paymentMethod;
  },

  async create(input: CreatePaymentMethodInput) {
    const { createPaymentMethod } = await serviceGqlFetcher(CREATE_PAYMENT_METHOD, { input });

    return createPaymentMethod;
  },

  async update(id: string, input: UpdatePaymentMethodInput) {
    const { updatePaymentMethod } = await serviceGqlFetcher(UPDATE_PAYMENT_METHOD, { id, input });

    return updatePaymentMethod;
  },

  async remove(id: string) {
    const result = await serviceGqlFetcher(REMOVE_PAYMENT_METHOD, { id });

    return result;
  }
};
