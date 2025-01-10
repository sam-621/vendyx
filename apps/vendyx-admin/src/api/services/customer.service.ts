import { getCustomerError } from '../errors/customer.errors';
import {
  COMMON_CUSTOMER_FRAGMENT,
  COMMON_CUSTOMER_ORDER_FRAGMENT,
  GET_ALL_CUSTOMER_ORDERS_QUERY,
  GET_ALL_CUSTOMERS_QUERY,
  GET_CUSTOMER_BY_ID_QUERY,
  UPDATE_CUSTOMER_MUTATION
} from '../operations/customer.operation';
import { type ID } from '../scalars/scalars.type';
import {
  type CustomerErrorCode,
  type CustomerListInput,
  getFragmentData,
  type OrderListInput,
  type UpdateCustomerInput
} from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const CustomerService = {
  Tags: {
    customers: 'customers',
    customer: (id: string) => `customers-${id}`,
    customerOrders: (id: string) => `customer-orders-${id}`
  },

  async getAll(input?: CustomerListInput) {
    const { customers } = await serviceGqlFetcher(
      GET_ALL_CUSTOMERS_QUERY,
      { input },
      { tags: [CustomerService.Tags.customers] }
    );

    return customers;
  },

  async getById(id: ID) {
    const result = await serviceGqlFetcher(
      GET_CUSTOMER_BY_ID_QUERY,
      { id },
      { tags: [CustomerService.Tags.customer(id)] }
    );

    const customer = getFragmentData(COMMON_CUSTOMER_FRAGMENT, result.customer);

    return customer;
  },

  async getOrders(id: ID, input: OrderListInput) {
    const { customer } = await serviceGqlFetcher(
      GET_ALL_CUSTOMER_ORDERS_QUERY,
      { id, input },
      { tags: [CustomerService.Tags.customerOrders(id)] }
    );

    const orders = customer?.orders.items.map(order =>
      getFragmentData(COMMON_CUSTOMER_ORDER_FRAGMENT, order)
    );

    return orders ?? [];
  },

  async update(customerId: ID, input: UpdateCustomerInput): Promise<CustomerResult> {
    const {
      updateCustomer: { apiErrors, customer }
    } = await serviceGqlFetcher(UPDATE_CUSTOMER_MUTATION, { customerId, input });

    const error = getCustomerError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, customerId: customer?.id ?? '' };
  }
};

type CustomerResult =
  | {
      success: true;
      customerId: ID;
    }
  | {
      success: false;
      error: string;
      errorCode: CustomerErrorCode;
    };
