import { type FC } from 'react';

import { productService } from '@/lib/shared/api';
import {
  DataTable,
  DataTableEmptyState,
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/lib/shared/components';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/shared/utils';

import { ProductTableColumns } from './products-table-columns';

export const ProductTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const products = await productService.getAll({ skip: getSkip(page, size), take: size });

  if (!products) {
    return (
      <DataTableEmptyState
        title="You have no products"
        description="You can start selling as soon as you add a product."
        action={{ label: 'Add product', to: '/product/create' }}
      />
    );
  }

  const data: ProductsTableRow[] =
    products.items?.map(p => {
      const totalStock = p.variants.items.reduce((acc, v) => acc + v.stock, 0);
      const image = DEFAULT_PRODUCT_IMAGE;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        status: p.enabled,
        image,
        stock: totalStock,
        totalVariants: p.variants.items.length
      };
    }) ?? [];

  return (
    <DataTable
      columns={ProductTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={products.pageInfo.total}
    />
  );
};

export type ProductsTableRow = {
  id: string;
  image: string;
  name: string;
  slug: string;
  stock: number;
  totalVariants: number;
  status: boolean;
};

type Props = DataTableSearchParams;
