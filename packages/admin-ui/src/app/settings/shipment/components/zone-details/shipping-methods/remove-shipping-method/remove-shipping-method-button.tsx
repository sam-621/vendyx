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

import { ShipmentKeys, useRemoveShippingMethod } from '@/app/settings/shipment/hooks';
import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const RemoveShippingMethod: FC<Props> = ({ zoneId, shippingMethod }) => {
  const { removeShippingMethod } = useRemoveShippingMethod();

  const onRemove = async () => {
    const { error } = await removeShippingMethod(shippingMethod.id);

    if (error) {
      return notification.error(error);
    }

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.single(zoneId) });
    notification.success(`Shipping method "${shippingMethod.name}" has been removed.`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          variant={'ghost'}
          className="h-full w-full flex justify-start px-2 py-[6px] rounded-sm cursor-pointer outline-none"
        >
          <span className={'text-red-500 hover:text-red-500'}>Remove</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove shipping method &quot;{shippingMethod.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to accept orders with this shipping method. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onRemove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  zoneId: string;
  shippingMethod: CommonZoneFragment['shippingMethods']['items'][0];
};
