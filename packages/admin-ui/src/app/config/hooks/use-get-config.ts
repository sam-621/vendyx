import { useQuery } from '@tanstack/react-query';

import { type AdminUiConfig } from '@/lib/ebloc/rest';
import { restFetcher } from '@/lib/rest';

import { ConfigKeys } from './config.keys';

export const useGetAdminUiConfig = () => {
  const result = useQuery({
    queryKey: ConfigKeys.config,
    queryFn: async () => await restFetcher<AdminUiConfig>({ url: 'admin-ui-config' })
  });

  return result;
};
