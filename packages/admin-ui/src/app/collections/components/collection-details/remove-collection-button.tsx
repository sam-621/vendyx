import { type FC } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@ebloc/theme';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CollectionKeys } from '../../hooks';
import { useRemoveCollection } from '../../hooks/use-remove-collection';

export const RemoveCollectionButton: FC<Props> = ({ collection }) => {
  const { removeCollection } = useRemoveCollection();

  const onRemove = async () => {
    const { errorMessage } = await removeCollection(collection.id);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CollectionKeys.all });
    notification.success('Collection removed successfully');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove Collection &quot;{collection.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onRemove}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
