import { GetPaymentMethodsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { PaymentKeys } from './payment.keys';

export const useGetPaymentMethods = () => {
  const { data, isLoading } = useGqlQuery({
    document: GetPaymentMethodsQuery,
    key: PaymentKeys.all
  });

  return {
    paymentMethods: data?.paymentMethods.items,
    isLoading
  };
};
