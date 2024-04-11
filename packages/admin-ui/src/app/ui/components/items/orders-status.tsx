import { type FC } from 'react';

import { Badge } from '@vendyx/theme';

import { OrderState } from '@/lib/vendyx/codegen/graphql';

export const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === OrderState.Modifying) {
    return <Badge variant="outline">Modifying</Badge>;
  }

  if (status === OrderState.PaymentAdded || status === OrderState.PaymentAuthorized) {
    return (
      <Badge variant="outline" className="bg-distinct/15 border-distinct text-distinct">
        Payment
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
        Delivered
      </Badge>
    );
  }

  return <Badge>Normal</Badge>;
};

type Props = {
  status: OrderState;
};
