import { useFragment } from '@/lib/ebloc/codegen';
import { CommonCustomer, GetCustomerDetailsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CustomersKeys } from './customer.keys';

export const useGetCustomerDetails = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetCustomerDetailsQuery,
    variables: { id },
    key: CustomersKeys.single(id)
  });
  const customer = useFragment(CommonCustomer, data?.customer);

  return {
    customer,
    isLoading
  };
};
