import { useGqlQuery } from '@/lib/gql';
import { ValidateTokenQuery } from '@/lib/vendyx/queries';

export const useValidateToken = () => {
  const { data, error, isLoading } = useGqlQuery({ document: ValidateTokenQuery });

  return {
    isAuthenticated: !error && data,
    isLoading
  };
};
