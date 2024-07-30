import { DataTable, DataTableSkeleton, DEFAULT_PRODUCT_IMAGE } from '@/lib/shared';

import { useGetProducts } from '../../hooks';
import { ProductTableColumns } from './products-table-columns';

export const ProductTable = () => {
  const { products, isLoading } = useGetProducts();

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const data: ProductTableRow[] =
    products?.map(p => {
      const totalStock = p.variants.items.reduce((acc, v) => acc + v.stock, 0);
      const image = p.assets.items[0];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        status: p.enabled ? 'enabled' : 'disabled',
        image: image?.source ?? DEFAULT_PRODUCT_IMAGE,
        stock: totalStock,
        totalVariants: p.variants.items.length
      };
    }) ?? [];

  return (
    <DataTable
      data={data}
      columns={ProductTableColumns}
      search={{ filterKey: 'name', placeholder: 'Search products...' }}
    />
  );
};

export type ProductTableRow = {
  id: string;
  image: string;
  name: string;
  slug: string;
  stock: number;
  totalVariants: number;
  status: 'enabled' | 'disabled';
};
