import { DefaultEntitySelectorRow, EntitySelector } from '@/lib/shared/components';

import { useCollectionProductSelector } from './use-collection-product-selector';

export const CollectionProductSelector = () => {
  const { products, isLoading } = useCollectionProductSelector();

  return (
    <EntitySelector
      title="Add products"
      description="Add products to your zone"
      triggerText="Add products"
      items={products}
      isLoading={isLoading}
      onDone={() => console.log('done')}
      onSearch={query => console.log(query)}
      renderItem={product => (
        <DefaultEntitySelectorRow
          key={product.id}
          checked={false}
          label={product.name}
          onCheckedChange={() => null}
        />
      )}
    />
  );
};
