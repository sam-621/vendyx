import { GetPaymentMethodsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetPaymentMethods = () => {
  const { data, isLoading } = useGqlQuery({ document: GetPaymentMethodsQuery });

  return {
    paymentMethods: data?.paymentMethods.items,
    isLoading
  };
};
