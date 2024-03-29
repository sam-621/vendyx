'use client';

import type { FC } from 'react';

import type { Row } from '@tanstack/react-table';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@vendyx/theme';
import { Loader2Icon, MoreHorizontalIcon } from 'lucide-react';

import { useRemoveProduct } from '@/core/inventory';

import { type TableProduct } from './product-table';

export const InventoryTableActions: FC<Props> = ({ row }) => {
  const { removeProduct, isLoading } = useRemoveProduct();
  const product: TableProduct = row.original;
  const productState = product.status === 'enabled' ? 'Enabled' : 'Disabled';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy SKU</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>State</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={productState}>
              <DropdownMenuRadioItem value={'enabled'}>Enabled</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={'disabled'}>Disabled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={async () => await removeProduct(product.id)}
          className="cursor-pointer"
        >
          <span className={`text-destructive font-medium`}>
            {isLoading ? 'Removing...' : 'Remove'}
          </span>
          {isLoading && <Loader2Icon className="h-4 w-4 ml-2 text-destructive animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  row: Row<TableProduct>;
};
