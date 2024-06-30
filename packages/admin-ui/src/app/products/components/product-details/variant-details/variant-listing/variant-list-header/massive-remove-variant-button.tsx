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
import { Trash2Icon } from 'lucide-react';

import { useProductDetailsContext, useVariantsContext } from '@/app/products/context';
import { ProductKeys, useMassiveVariantRemove } from '@/app/products/hooks';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const MassiveRemoveVariantButton = () => {
  const { product } = useProductDetailsContext();
  const { checkedVariants, resetCheckedVariants } = useVariantsContext();
  const { massiveVariantRemove } = useMassiveVariantRemove();

  const onRemove = async () => {
    if (!product) return;

    const notificationId = notification.loading('Removing variants...');

    await massiveVariantRemove(
      checkedVariants.map(id => id),
      product
    );

    await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product.slug) });
    resetCheckedVariants();

    notification.dismiss(notificationId);
    notification.success('Variants removed successfully');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="link" className="gap-1 text-destructive">
          <Trash2Icon size={16} />
          Delete selected
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove {checkedVariants.length} variant{checkedVariants.length > 1 ? 's' : ''}
          </AlertDialogTitle>
          <AlertDialogDescription>
            It will remove {checkedVariants.length} variant{checkedVariants.length > 1 ? 's' : ''}{' '}
            from your store. This action cannot be undone.
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
