import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useRemoveCollection } from './use-remove-collection';

export const RemoveCollectionButton: FC<Props> = ({ collection }) => {
  const { removeCollection, isLoading } = useRemoveCollection();

  return (
    <RemoveEntityButton
      title={`Remove collection "${collection.name}"`}
      description="This action cannot be undone"
      onRemove={async () => await removeCollection(collection.id)}
      isLoading={isLoading}
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
