import { type FC } from 'react';

import { Badge } from '@ebloc/theme';

import { OrderState } from '@/lib/ebloc/codegen/graphql';

export const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === OrderState.Modifying) {
    return <Badge variant="outline">Adding</Badge>;
  }

  if (status === OrderState.PaymentAdded || status === OrderState.PaymentAuthorized) {
    return (
      <Badge variant="outline" className="bg-distinct/15 border-distinct text-distinct">
        Payed
      </Badge>
    );
  }

  if (status === OrderState.Shipped) {
    return (
      <Badge variant="outline" className="bg-warning/15 border-distinct">
        Sent
      </Badge>
    );
  }

  if (status === OrderState.Delivered) {
    return (
      <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
        Completed
      </Badge>
    );
  }

  return <Badge>Adding</Badge>;
};

type Props = {
  status: OrderState;
};
