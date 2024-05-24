import { type FC } from 'react';

import { Badge } from '@vendyx/theme';

import { OrderState } from '@/lib/vendyx/codegen/graphql';

export const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === OrderState.Modifying) {
    return <Badge variant="outline">Agregando</Badge>;
  }

  if (status === OrderState.PaymentAdded || status === OrderState.PaymentAuthorized) {
    return (
      <Badge variant="outline" className="bg-distinct/15 border-distinct text-distinct">
        Pagada
      </Badge>
    );
  }

  if (status === OrderState.Shipped) {
    return (
      <Badge variant="outline" className="bg-warning/15 border-distinct">
        Enviada
      </Badge>
    );
  }

  if (status === OrderState.Delivered) {
    return (
      <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
        Completada
      </Badge>
    );
  }

  return <Badge>Normal</Badge>;
};

type Props = {
  status: OrderState;
};
