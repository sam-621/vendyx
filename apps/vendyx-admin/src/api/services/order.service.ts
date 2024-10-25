import { getFragmentData } from '../codegen';
import { type MarkOrderAsShippedInput, type OrderListInput } from '../codegen/graphql';
import { getOrderError } from '../errors/order.errors';
import {
  CANCEL_ORDER_MUTATION,
  COMMON_ORDER_FRAGMENT,
  GET_ALL_ORDERS_QUERY,
  GET_ORDER_BY_ID_QUERY,
  MARK_ORDER_AS_DELIVERED_MUTATION,
  MARK_ORDER_AS_SHIPPED_MUTATION
} from '../operations';
import { type ID } from '../scalars';
import { fetcher } from './fetcher';

export const OrderService = {
  Tags: {
    orders: 'orders',
    order: (id: string) => `orders-${id}`
  },

  async getAll(input?: OrderListInput) {
    const { orders } = await fetcher(
      GET_ALL_ORDERS_QUERY,
      { input },
      { tags: [OrderService.Tags.orders] }
    );

    return orders;
  },

  async getById(id: ID) {
    const result = await fetcher(
      GET_ORDER_BY_ID_QUERY,
      { orderId: id },
      { tags: [OrderService.Tags.order(id)] }
    );

    const order = getFragmentData(COMMON_ORDER_FRAGMENT, result.order);

    return order;
  },

  async markAsShipped(orderId: ID, input: MarkOrderAsShippedInput) {
    const {
      markOrderAsShipped: { apiErrors, order }
    } = await fetcher(MARK_ORDER_AS_SHIPPED_MUTATION, { orderId, input });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  },

  async markAsDelivered(orderId: ID) {
    const {
      markOrderAsDelivered: { apiErrors, order }
    } = await fetcher(MARK_ORDER_AS_DELIVERED_MUTATION, { orderId });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  },

  async cancel(orderId: ID) {
    const {
      cancelOrder: { apiErrors, order }
    } = await fetcher(CANCEL_ORDER_MUTATION, { orderId });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  }
};
