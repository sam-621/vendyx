import { useCallback, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type ID } from '@/api/scalars/scalars.type';
import { type CommonCollectionProductFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';
import { PAGINATION_PAGE_SIZE } from '@/shared/hooks/use-pagination';

export const useCollectionProductsTable = (collectionId: ID) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<CommonCollectionProductFragment[]>([]);

  const fetchProducts = useCallback(async (page: number, search: string) => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: PAGINATION_PAGE_SIZE.toString(),
      search,
      collectionId
    });

    const { data: products } = await restFetcher<InternalApiProducts>('/collection/products', {
      queryParams: searchParams,
      internal: true,
      tags: ['client-collection-products', collectionId]
    });

    setProducts(products);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    fetchProducts,
    products
  };
};

type InternalApiProducts = InternalApiResponse<CommonCollectionProductFragment[]>;
