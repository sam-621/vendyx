import { useGqlQuery } from '@/lib/gql';
import { ValidateTokenQuery } from '@/lib/vendyx/queries';

import { AdminKeys } from './admin-keys';

export const useValidateToken = () => {
  const { data, error, isLoading } = useGqlQuery({
    document: ValidateTokenQuery,
    key: AdminKeys.validate
  });

  return {
    isAuthenticated: !error && data?.validateToken,
    isLoading
  };
};
