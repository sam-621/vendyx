import { DataTable, DataTableSkeleton } from '@/lib/components';

import { useGetCollections } from '../../hooks';
import { CollectionTableColumns } from './collection-table-columns';

export const CollectionTable = () => {
  const { collections, isLoading } = useGetCollections();

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
      enabled: collection.enabled
    })) ?? [];

  return (
    <DataTable
      columns={CollectionTableColumns}
      data={data}
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
