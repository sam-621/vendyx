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

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { ProductKeys, useRemoveProduct } from '../../hooks';

export const RemoveProductButton: FC<Props> = ({ product }) => {
  const { removeProduct } = useRemoveProduct();

  const onRemove = async () => {
    const error = await removeProduct(product.slug);

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ProductKeys.all });
    notification.success(`Product "${product.name}" has been removed.`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove product &quot;{product.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            By removing this product you will also remove all its variants. This action cannot be
            undone.
          </AlertDialogDescription>
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
  product: CommonProductFragment;
};
