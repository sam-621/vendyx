import { type FC } from 'react';

import { type CommonOrderFragment, OrderState } from '@/api/types';
import { Button } from '@/lib/shared/components';

import { MarkOrderAsDeliveredButton } from '../mark-order-as-delivered';
import { MarkOrderAsShippedButton } from '../mark-order-as-shipped';

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
    return <MarkOrderAsShippedButton />;
  }

  if (orderState === OrderState.Shipped) {
    return <MarkOrderAsDeliveredButton />;
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
