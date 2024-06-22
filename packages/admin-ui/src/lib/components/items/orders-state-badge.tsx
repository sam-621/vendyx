import { type FC } from 'react';

import { Badge } from '@ebloc/theme';
import { BookmarkIcon, PackageCheckIcon, TruckIcon } from 'lucide-react';

import { OrderState } from '@/lib/ebloc/codegen/graphql';

export const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === OrderState.Modifying) {
    return <Badge variant="outline">Adding</Badge>;
  }

  if (status === OrderState.PaymentAdded || status === OrderState.PaymentAuthorized) {
    return (
      <Badge
        variant="outline"
        className="flex gap-1 bg-distinct/15 border-distinct text-distinct w-fit"
      >
        <BookmarkIcon size={16} /> Paid
      </Badge>
    );
  }

  if (status === OrderState.Shipped) {
    return (
      <Badge variant="outline" className="flex gap-1 bg-warning/15 border-distinct w-fit">
        <TruckIcon size={16} /> Sent
      </Badge>
    );
  }

  if (status === OrderState.Delivered) {
    return (
      <Badge
        variant="outline"
        className="flex gap-1 bg-primary/10 border-primary text-primary w-fit"
      >
        <PackageCheckIcon size={16} /> Completed
      </Badge>
    );
  }

  return <Badge>Adding</Badge>;
};

type Props = {
  status: OrderState;
};
