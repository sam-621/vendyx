import { useEffect, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import { restFetcher } from '@/api/fetchers';
import { type CommonProductForSelectorFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils';

export const useCollectionProductSelector = () => {
  const [products, setProducts] = useState<CommonProductForSelectorFragment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  useEffect(() => {
    void (async () => {
      setIsFetching(true);

      const searchParams = new URLSearchParams({
        search
      });

      const result = await restFetcher<InternalApiProductsForSelector>('/product', {
        queryParams: searchParams,
        tags: ['products-for-selector'],
        internal: true
      });

      setProducts(result.data);
      setIsFetching(false);
    })();
  }, [search, refetch]);

  return {
    isFetching,
    handleSearch,
    products,
    refetch: () => setRefetch(refetch + 1)
  };
};

type InternalApiProductsForSelector = InternalApiResponse<CommonProductForSelectorFragment[]>;
