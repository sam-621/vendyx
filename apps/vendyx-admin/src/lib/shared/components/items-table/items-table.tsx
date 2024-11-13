'use client';

import { type ReactElement, type ReactNode, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/lib/shared/components';

import { PAGINATION_PAGE_SIZE, usePagination } from '../../hooks';
import { ItemsTableEmptyState } from './items-table-empty-state';

/**
 * Display a list of items in a entity view (cutomer orders, collection products, etc.)
 * Paginable, searchable and with a loading state.
 *
 * Thought to be used in client side only.
 */
export const ItemsTable = <T,>({
  title,
  headers,
  items,
  renderRow,
  onChange,
  isLoading,
  emptyState
}: Props<T>) => {
  const { page, search, handleSearch, nextPage, prevPage } = usePagination();

  useEffect(() => {
    onChange?.(page, search);
  }, [search, page]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>{title}</CardTitle>
        {isLoading && <Loader2Icon size={16} className="animate-spin" />}
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Input placeholder="Search..." onChange={e => handleSearch(e.target.value)} />

          <Button
            disabled={page === 1 || isLoading}
            type="button"
            variant="outline"
            onClick={() => prevPage()}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span>{page}</span>
          <Button
            type="button"
            disabled={items.length < PAGINATION_PAGE_SIZE || isLoading}
            variant="outline"
            onClick={() => items.length === PAGINATION_PAGE_SIZE && nextPage()}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!items.length
              ? emptyState ?? <ItemsTableEmptyState />
              : items.map(item => renderRow(item))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props<T> = {
  title: string;
  headers: string[];
  items: T[];
  renderRow: (row: T) => ReactElement;
  onSearch?: (search: string) => void;
  onPaginate?: (page: number) => void;
  // change both search and paginate
  onChange?: (page: number, search: string) => void;
  isLoading?: boolean;
  emptyState?: ReactNode;
};
