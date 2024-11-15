import { useEffect, useState } from 'react';

import { restFetcher } from '@/api/fetchers';
import { type CommonProductForSelectorFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils';

export const useCollectionProductSelector = () => {
  const [products, setProducts] = useState<CommonProductForSelectorFragment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const result = await restFetcher<InternalApiProductsForSelector>('/product', {
        tags: ['products-for-selector'],
        internal: true
      });

      setProducts(result.data);
      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
    products
  };
};

type InternalApiProductsForSelector = InternalApiResponse<CommonProductForSelectorFragment[]>;
