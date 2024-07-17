import { GetPaymentMethodsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetPaymentMethods = () => {
  const { data } = useGqlQuery({ document: GetPaymentMethodsQuery });

  return {
    paymentMethods: data?.paymentMethods.items
  };
};
