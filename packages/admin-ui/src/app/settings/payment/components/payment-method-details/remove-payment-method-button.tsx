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

import { type CommonPaymentMethodFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { PaymentKeys, useRemovePaymentMethod } from '../../hooks';

export const RemovePaymentMethodButton: FC<Props> = ({ paymentMethod }) => {
  const { removePaymentMethod } = useRemovePaymentMethod();

  const onRemove = async () => {
    const { error } = await removePaymentMethod(paymentMethod.id);

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: PaymentKeys.all });
    notification.success('Payment method removed successfully');
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
            Remove Payment Method &quot;{paymentMethod.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-3">
              <span>You will:</span>
              <ul>
                <li>• Stop receiving payments using this method</li>
                <li>• Not be able to make refunds for orders created with this payment method</li>
              </ul>
              <span>This action cannot be undone.</span>
            </div>
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
  paymentMethod: CommonPaymentMethodFragment;
};
