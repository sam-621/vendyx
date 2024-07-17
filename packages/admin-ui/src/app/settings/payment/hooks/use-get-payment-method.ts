import { useFragment } from '@/lib/ebloc/codegen';
import { CommonPaymentMethodFragment, GetPaymentMethodQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetPaymentMethod = (id: string) => {
  const { data, isLoading } = useGqlQuery({ document: GetPaymentMethodQuery, variables: { id } });
  const paymentMethod = useFragment(CommonPaymentMethodFragment, data?.paymentMethod);

  return {
    paymentMethod,
    isLoading
  };
};
