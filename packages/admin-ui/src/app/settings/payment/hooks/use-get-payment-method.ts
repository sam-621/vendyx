import { useFragment } from '@/lib/ebloc/codegen';
import { CommonPaymentMethodFragment, GetPaymentMethodQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetPaymentMethod = () => {
  const { data, isLoading } = useGqlQuery({ document: GetPaymentMethodQuery });
  const paymentMethod = useFragment(CommonPaymentMethodFragment, data?.paymentMethod);

  return {
    paymentMethod,
    isLoading
  };
};
