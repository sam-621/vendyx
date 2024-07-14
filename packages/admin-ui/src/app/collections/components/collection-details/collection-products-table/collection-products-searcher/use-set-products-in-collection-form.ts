import { CollectionKeys } from '@/app/collections/hooks';
import { useSetProductsInCollection } from '@/app/collections/hooks/use-set-products-in-collection';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const useSetProductsInCollectionForm = (collection: CommonCollectionFragment) => {
  const productsInCollection = collection.products.items.map(p => p.id) ?? [];
  const { setProductsInCollection } = useSetProductsInCollection();

  const onDone = async (selectedIds: string[]) => {
    if (JSON.stringify(productsInCollection) === JSON.stringify(selectedIds)) {
      return { success: true };
    }

    const { errorMessage } = await setProductsInCollection(collection.id, selectedIds);

    if (errorMessage) {
      notification.error(errorMessage);
      return { success: false };
    }

    await queryClient.invalidateQueries({ queryKey: CollectionKeys.single(collection.id) });

    if (selectedIds.length === 0) {
      notification.success('All products removed from collection');
    } else {
      notification.success(`Products added to collection`);
    }

    return { success: true };
  };

  return {
    productsInCollection,
    onDone
  };
};
