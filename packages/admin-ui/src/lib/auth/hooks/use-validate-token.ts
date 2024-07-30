import { useGqlQuery, ValidateTokenQuery } from '@/lib/shared';

import { AuthKeys } from './auth-keys';

export const useValidateToken = () => {
  const { data, error, isLoading } = useGqlQuery({
    document: ValidateTokenQuery,
    key: AuthKeys.validate
  });

  return {
    isAuthenticated: !error && data?.validateToken,
    isLoading
  };
};
