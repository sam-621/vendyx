import { type FC } from 'react';

import { type CommonOrderFragment, OrderState } from '@/api/types';
import { Button } from '@/lib/shared/components';

export const OrderStatusTransitionButton: FC<Props> = ({ order }) => {
  const orderState = order.state;

  if (orderState === OrderState.Modifying) {
    return (
      <Button disabled type="button">
        Complete order
      </Button>
    );
  }

  if (orderState === OrderState.PaymentAdded) {
    return <Button type="button">Authorize payment</Button>;
  }

  if (orderState === OrderState.PaymentAuthorized) {
    // return <MarkOrderAsShippedOrderButton id={order.id} />;
    return <Button type="button">Mark as sent</Button>;
  }

  if (orderState === OrderState.Shipped) {
    // return <MarkOrderAsDeliveredButton id={order.id} />;
    return <Button type="button">Complete order</Button>;
  }

  // Delivered
  return (
    <Button disabled type="button">
      Complete order
    </Button>
  );
};

type Props = {
  order: CommonOrderFragment;
};
