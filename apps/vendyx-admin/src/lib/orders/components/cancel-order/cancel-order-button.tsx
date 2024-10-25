'use client';

import { AlertCircleIcon } from 'lucide-react';

import { type CommonOrderFragment } from '@/api/types';
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
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';

import { useCancelOrder } from './use-cancel-order';

export const CancelOrderButton = () => {
  const { cancelOrder, isLoading } = useCancelOrder();
  const { entity: order } = useEntityContext<CommonOrderFragment>();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-sm px-2 py-1.5 text-sm font-normal w-full justify-start"
        >
          <AlertCircleIcon size={16} className="mr-2 h-4 w-4 transition-all text-red-500" />
          <span className="text-red-500">Cancel order</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">Cancel order {order.code}</AlertDialogTitle>
          <AlertDialogDescription>
            Cancelling this order will make it unavailable for further processing. Are you sure you
            want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={cancelOrder} isLoading={isLoading}>
              Remove
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
