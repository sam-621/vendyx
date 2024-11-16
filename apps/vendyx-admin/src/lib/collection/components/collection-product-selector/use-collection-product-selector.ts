import { useEffect, useState } from 'react';

import { restFetcher } from '@/api/fetchers';
import { type CommonProductForSelectorFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils';

export const useCollectionProductSelector = () => {
  const [products, setProducts] = useState<CommonProductForSelectorFragment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    void (async () => {
      setIsFetching(true);

      const result = await restFetcher<InternalApiProductsForSelector>('/product', {
        tags: ['products-for-selector'],
        internal: true
      });

      setProducts(result.data);
      setIsFetching(false);
    })();
  }, [refetch]);

  return {
    isFetching,
    products,
    refetch: () => setRefetch(refetch + 1)
  };
};

type InternalApiProductsForSelector = InternalApiResponse<CommonProductForSelectorFragment[]>;
