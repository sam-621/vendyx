import { type FC } from 'react';

import { MoreVerticalIcon } from 'lucide-react';

import { type CommonOrderFragment, OrderState } from '@/api/types';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';

import { CancelOrderButton } from '../cancel-order/cancel-order-button';

export const OrderActionsButton: FC<Props> = ({ order }) => {
  if (order.state === OrderState.Canceled) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex h-8 w-8 p-0 ring-0 focus-visible:ring-0">
          <MoreVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <CancelOrderButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  order: CommonOrderFragment;
};
