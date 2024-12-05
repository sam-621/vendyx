import { getFragmentData } from '../codegen';
import { type CreateShippingMethodInput, type UpdateShippingMethodInput } from '../codegen/graphql';
import { getShippingMethodError } from '../errors';
import {
  COMMON_SHIPPING_HANDLERS_FRAGMENT,
  CREATE_SHIPPING_METHOD_MUTATION,
  GET_ALL_SHIPPING_HANDLERS_QUERY,
  REMOVE_SHIPPING_METHOD_MUTATION,
  UPDATE_SHIPPING_METHOD_MUTATION
} from '../operations/shipping-method.operations';
import { type ID } from '../scalars';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ShippingMethodService = {
  Tags: {
    handlers: 'shipping-handlers'
  },

  async getHandlers() {
    const result = await serviceGqlFetcher(
      GET_ALL_SHIPPING_HANDLERS_QUERY,
      {},
      { tags: [ShippingMethodService.Tags.handlers] }
    );

    const shippingHandlers = getFragmentData(
      COMMON_SHIPPING_HANDLERS_FRAGMENT,
      result.shippingHandlers
    );

    return shippingHandlers;
  },

  async create(input: CreateShippingMethodInput): Promise<Result> {
    const {
      createShippingMethod: { apiErrors, shippingMethod }
    } = await serviceGqlFetcher(CREATE_SHIPPING_METHOD_MUTATION, {
      input
    });

    const error = getShippingMethodError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, shippingMethodId: shippingMethod?.id ?? '' };
  },

  async update(id: string, input: UpdateShippingMethodInput) {
    const { updateShippingMethod } = await serviceGqlFetcher(UPDATE_SHIPPING_METHOD_MUTATION, {
      id,
      input
    });

    return updateShippingMethod;
  },

  async remove(id: string) {
    const { removeShippingMethod } = await serviceGqlFetcher(REMOVE_SHIPPING_METHOD_MUTATION, {
      id
    });

    return removeShippingMethod;
  }
};

type Result =
  | {
      success: false;
      error: string;
      errorCode: string;
    }
  | {
      success: true;
      shippingMethodId: ID;
    };
