import { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

export const PAGINATION_PAGE_SIZE = 10;

/**
 * Manages pagination and search for a list of items.
 */
export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, 300);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => (prev === 1 ? prev : prev - 1));

  return {
    page,
    search,
    handleSearch,
    nextPage,
    prevPage
  };
};
