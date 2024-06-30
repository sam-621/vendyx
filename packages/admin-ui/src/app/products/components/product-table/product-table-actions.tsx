import type { FC } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@ebloc/theme';
import type { Row } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';

import { t } from '@/lib/locales';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { ProductKeys, useUpdateProduct } from '../../hooks';
import { type TableProduct } from './product-table';

export const ProductTableActions: FC<Props> = ({ row }) => {
  const { updateProduct } = useUpdateProduct();
  const product: TableProduct = row.original;
  const productState = product.status === 'enabled' ? 'enabled' : 'disabled';

  const updateProductState = async (published: boolean) => {
    const notificationId = notification.loading('Updating product state...');

    await updateProduct(product.id, { published });
    await queryClient.invalidateQueries({ queryKey: ProductKeys.all });

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  row: Row<TableProduct>;
};
