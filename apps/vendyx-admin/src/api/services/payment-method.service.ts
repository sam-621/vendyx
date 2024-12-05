import { getFragmentData } from '../codegen';
import {
  type CreatePaymentMethodInput,
  type PaymentMethodErrorCode,
  type UpdatePaymentMethodInput
} from '../codegen/graphql';
import { getPaymentMethodError } from '../errors';
import {
  COMMON_PAYMENT_HANDLER_FRAGMENT,
  COMMON_PAYMENT_METHOD_FRAGMENT,
  CREATE_PAYMENT_METHOD,
  GET_ALL_PAYMENT_HANDLERS,
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
    handlers: 'handlers'
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

  async getAllHandlers() {
    const result = await serviceGqlFetcher(
      GET_ALL_PAYMENT_HANDLERS,
      {},
      { tags: [PaymentMethodService.Tags.handlers] }
    );

    const paymentHandlers = getFragmentData(
      COMMON_PAYMENT_HANDLER_FRAGMENT,
      result.paymentHandlers
    );

    return paymentHandlers;
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

  async create(input: CreatePaymentMethodInput): Promise<Result> {
    const {
      createPaymentMethod: { apiErrors, paymentMethod }
    } = await serviceGqlFetcher(CREATE_PAYMENT_METHOD, { input });

    const error = getPaymentMethodError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, paymentMethodId: paymentMethod?.id ?? '' };
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

type Result =
  | {
      success: true;
      paymentMethodId: string;
    }
  | {
      success: false;
      error: string;
      errorCode: PaymentMethodErrorCode;
    };
