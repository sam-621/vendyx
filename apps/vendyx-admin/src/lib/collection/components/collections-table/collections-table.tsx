import { type FC } from 'react';

import { CollectionService } from '@/api/services';
import {
  DataTable,
  DataTableEmptyState,
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/lib/shared/components';

import { CollectionsTableColumns } from './collections-table-columns';

export const CollectionsTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: collections, pageInfo } = await CollectionService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: { name: { contains: search } }
  });

  if (!collections.length && !search) {
    return (
      <DataTableEmptyState
        title="You have no collections"
        description="Group your products by collections."
        action={{ label: 'Add collection', to: '/collections/new' }}
      />
    );
  }

  const data: CollectionsTableRow[] =
    collections?.map(c => {
      const totalProducts = c.products.count;
      const image = c.assets.items[0]?.source;

      return {
        id: c.id,
        name: c.name,
        image,
        totalProducts,
        status: c.enabled
      };
    }) ?? [];

  return (
    <DataTable
      columns={CollectionsTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={pageInfo.total}
    />
  );
};

export type CollectionsTableRow = {
  id: string;
  image: string;
  name: string;
  totalProducts: number;
  status: boolean;
};

type Props = DataTableSearchParams;
