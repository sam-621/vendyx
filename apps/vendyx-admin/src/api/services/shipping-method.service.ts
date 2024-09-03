import { type CreateShippingMethodInput, type UpdateShippingMethodInput } from '../codegen/graphql';
import {
  CREATE_SHIPPING_METHOD_MUTATION,
  GET_ALL_SHIPPING_HANDLERS_QUERY,
  REMOVE_SHIPPING_METHOD_MUTATION,
  UPDATE_SHIPPING_METHOD_MUTATION
} from '../operations/shipping-method.operations';
import { fetcher } from './fetcher';

export const ShippingMethodService = {
  Tags: {
    handlers: 'shipping-handlers'
  },

  async getHandlers() {
    const { shippingHandlers } = await fetcher(
      GET_ALL_SHIPPING_HANDLERS_QUERY,
      {},
      { tags: [ShippingMethodService.Tags.handlers] }
    );

    return shippingHandlers;
  },

  async create(input: CreateShippingMethodInput) {
    const { createShippingMethod } = await fetcher(CREATE_SHIPPING_METHOD_MUTATION, { input });

    return createShippingMethod;
  },

  async update(id: string, input: UpdateShippingMethodInput) {
    const { updateShippingMethod } = await fetcher(UPDATE_SHIPPING_METHOD_MUTATION, { id, input });

    return updateShippingMethod;
  },

  async remove(id: string) {
    const { removeShippingMethod } = await fetcher(REMOVE_SHIPPING_METHOD_MUTATION, { id });

    return removeShippingMethod;
  }
};
