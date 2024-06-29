import { GetCustomersQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CustomersKeys } from './customer.keys';

export const useGetCustomers = () => {
  const { data, isLoading } = useGqlQuery({ document: GetCustomersQuery, key: CustomersKeys.all });

  return {
    customers: data?.customers,
    isLoading
  };
};
