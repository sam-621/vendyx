'use client';

import { useEffect, useState } from 'react';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { startProgressBar, stopProgressBar } from '@/lib/progress-bar';
import { cn } from '@/lib/utils';

import { Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui';
import { DataTablePagination } from './data-table-pagination';
import { getParamName } from './data-table-utils';

export const DataTable = <TData, TValue>({
  columns,
  data,
  totalRows,
  queryParamPrefix,
  defaults
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pagination, setPagination] = useState({
    pageIndex: defaults.page - 1, // initial page index
    pageSize: defaults.size // default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    manualPagination: true,
    rowCount: totalRows,
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  });

  /**
   * @description
   * Make a search query with a debounce of 300ms.
   * When searching, the page index is reset to 0 (if it's not already 0)
   * in both, the table state and the url
   * in order to show the first page of results.
   */
  const handleSearch = useDebouncedCallback((query: string) => {
    startProgressBar();
    const params = new URLSearchParams(searchParams);

    if (!query) {
      params.delete(getParamName('search'));
    } else {
      params.set(getParamName('search'), query);
    }

    if (table.getState().pagination.pageIndex !== 0) {
      table.setPageIndex(0);
      params.set(getParamName('page'), '1');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  useEffect(() => {
    stopProgressBar();

    return () => {
      stopProgressBar();
    };
  }, [data]);

  /**
   * @description
   * Only execute when the page size changes
   * to take advantage of how react-table calculates the current page index
   * and avoid make that calculation ourselves.
   * Also make some validations to avoid unnecessary changes in the url
   * like when page size and page index are the default values.
   *
   * @note
   * Page index is also update in {@link DataTablePagination} component
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (pagination.pageIndex === 0) {
      params.delete(getParamName('page'));
    } else {
      params.set(getParamName('page'), String(pagination.pageIndex + 1));
    }

    if (pagination.pageSize === 10) {
      params.delete(getParamName('size'));
    } else {
      params.set(getParamName('size'), String(pagination.pageSize));
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 w-full">
          <Input
            placeholder="Search..."
            className="bg-background w-fit"
            onChange={e => handleSearch(e.target.value)}
            defaultValue={searchParams.get(getParamName('search'))?.toString()}
          />
        </div>
        {/* {download && <DownloadDataTableButton download={download} data={data} />} */}
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead className={cn('', { 'pl-3': i === 0 })} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell className={cn('', { 'pl-3': i === 0 })} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {/* TODO: EMPTY STATE */}
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* footer */}
      <DataTablePagination prefix={queryParamPrefix} table={table} />
    </div>
  );
};

export type DataTableProps<TData, TValue> = ConfigurableTable & {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /**
   * TODO: Make this required
   *
   * @description
   * Add a prefix to the filtering query params in the url,
   * this is useful when working with 2 data tables in the same page
   */
  queryParamPrefix?: string;
};

/**
 * @description
 * Type for a table that accepts configuration for pagination and filters
 */
export type ConfigurableTable = {
  /**
   * TODO: Make this required
   */
  totalRows: number;
  /**
   * TODO: Make this required
   *
   * @description
   * Default values for the pagination and filters
   */
  defaults: {
    page: number;
    size: number;
    search: string;
  };
};
