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

import { t } from '@/lib/locales';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { InventoryKeys, useRemoveProduct, useUpdateProduct } from '../../hooks';
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
          {t('inventory.action.copy-sku')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{t('inventory.action.state')}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={productState}>
              <DropdownMenuRadioItem
                onClick={async () => await updateProductState(true)}
                value={'enabled'}
              >
                {t('general.enabled')}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                onClick={async () => await updateProductState(false)}
                value={'disabled'}
              >
                {t('general.disabled')}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={async () => {
            const notificationId = notification.loading(
              t('inventory.action.remove.pending') + '...'
            );

            await removeProduct(product.id);
            await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

            notification.dismiss(notificationId);
            notification.success(t('inventory.action.remove.success'));
          }}
          className="cursor-pointer"
        >
          <span className={`text-destructive font-medium`}>
            {isLoading
              ? `${t('inventory.action.remove.pending')}...`
              : t('inventory.action.remove')}
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
