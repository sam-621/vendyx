import { type Table } from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { startProgressBar } from '../../progress-bar';
import { Button } from '../ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getParamName } from './data-table-utils';

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  prefix?: string;
};

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangePage = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(getParamName('page'), String(pageIndex + 1));

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={value => {
            startProgressBar();
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="muted text-muted-foreground sm:hidden">Rows per page</p>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium small text-muted-foreground sm:hidden">
        Page {searchParams.get(getParamName('page')) ?? 1} of {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              startProgressBar();
              table.setPageIndex(0);
              handleChangePage(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              startProgressBar();
              table.previousPage();
              handleChangePage(table.getState().pagination.pageIndex - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              startProgressBar();
              table.nextPage();
              handleChangePage(table.getState().pagination.pageIndex + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              startProgressBar();
              table.setPageIndex(table.getPageCount() - 1);
              handleChangePage(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
