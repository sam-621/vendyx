import { getFragmentData } from '../codegen';
import { type OrderListInput } from '../codegen/graphql';
import { COMMON_ORDER_FRAGMENT, GET_ALL_ORDERS_QUERY, GET_ORDER_BY_ID_QUERY } from '../operations';
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
  }
};
