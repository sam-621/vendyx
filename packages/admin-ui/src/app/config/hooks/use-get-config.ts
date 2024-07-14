import { GetAdminUiConfigQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { ConfigKeys } from './config.keys';

export const useGetAdminUiConfig = () => {
  const { data, isLoading } = useGqlQuery({
    document: GetAdminUiConfigQuery,
    key: ConfigKeys.config
  });

  return {
    data: data?.adminUiConfig,
    isLoading
  };
};
