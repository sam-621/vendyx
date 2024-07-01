import { DataTable, DataTableSkeleton } from '@/lib/components';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CollectionKeys, useGetCollections } from '../../hooks';
import { useRemoveCollection } from '../../hooks/use-remove-collection';
import { CollectionTableColumns } from './collection-table-columns';

export const CollectionTable = () => {
  const { collections, isLoading } = useGetCollections();
  const { removeCollection } = useRemoveCollection();

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const data: TableCollection[] =
    collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      image: '',
      totalProducts: collection.products.count,
      enabled: collection.published
    })) ?? [];

  return (
    <DataTable
      columns={CollectionTableColumns}
      data={data}
      onRemove={async rows => {
        const id = notification.loading('Removing collections...');

        await Promise.all(rows.map(async row => await removeCollection(row.id)));
        await queryClient.invalidateQueries({ queryKey: CollectionKeys.all });

        notification.dismiss(id);
        notification.success('Collections removed');
      }}
      search={{ filterKey: 'name', placeholder: 'Search collections...' }}
    />
  );
};

export type TableCollection = {
  id: string;
  name: string;
  slug: string;
  image: string;
  totalProducts: number;
  enabled: boolean;
};
