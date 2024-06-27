import { DataTable } from '@/lib/components/data-table';
import { DataTableSkeleton } from '@/lib/components/skeletons';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { t } from '@/lib/locales';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { InventoryKeys, useGetProducts, useRemoveProduct } from '../../hooks';
import { ProductTableColumns } from './product-table-columns';

export const ProductTable = () => {
  const { products, isLoading } = useGetProducts();
  const { removeProduct } = useRemoveProduct();

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const data: TableProduct[] =
    products?.map(p => {
      const variant = p.variants.items[0];
      const image = p.assets.items[0];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        status: p.published ? 'enabled' : 'disabled',
        image: image?.source ?? DEFAULT_PRODUCT_IMAGE,
        price: variant?.price ?? 0,
        sku: variant?.sku,
        stock: variant?.stock
      };
    }) ?? [];

  return (
    <DataTable
      data={data}
      columns={ProductTableColumns}
      search={{ filterKey: 'name', placeholder: t('inventory.table.search') }}
      onRemove={async products => {
        const id = notification.loading('Removing products...');

        const results = await Promise.all(
          products.map(async product => await removeProduct(product.slug))
        );

        const errorMessage = results.find(r => r !== undefined);
        if (errorMessage) {
          notification.error(errorMessage);
          notification.dismiss(id);
          return;
        }

        await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

        notification.dismiss(id);
        notification.success('Products removed successfully');
      }}
    />
  );
};

export type TableProduct = {
  id: string;
  sku: string;
  image: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: 'enabled' | 'disabled';
};
