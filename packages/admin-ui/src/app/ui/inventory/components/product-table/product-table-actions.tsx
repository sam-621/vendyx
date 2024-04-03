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

import { InventoryKeys, useRemoveProduct, useUpdateProduct } from '@/core/inventory';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { type TableProduct } from './product-table';

export const InventoryTableActions: FC<Props> = ({ row }) => {
  const { removeProduct, isLoading } = useRemoveProduct();
  const { updateProduct } = useUpdateProduct();
  const product: TableProduct = row.original;
  const productState = product.status === 'enabled' ? 'enabled' : 'disabled';

  const updateProductState = async (published: boolean) => {
    const notificationId = notification.loading('Updating product state...');

    await updateProduct(product.id, { published });
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

    notification.dismiss(notificationId);
    notification.success(`Product ${published ? 'enabled' : 'disabled'}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(product.sku);
            notification.success('SKU copied to clipboard');
          }}
        >
          Copy SKU
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>State</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={productState}>
              <DropdownMenuRadioItem
                onClick={async () => await updateProductState(true)}
                value={'enabled'}
              >
                Enabled
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                onClick={async () => await updateProductState(false)}
                value={'disabled'}
              >
                Disabled
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={async () => {
            const notificationId = notification.loading('Removing product...');

            await removeProduct(product.id);
            await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

            notification.dismiss(notificationId);
            notification.success('Product removed successfully');
          }}
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