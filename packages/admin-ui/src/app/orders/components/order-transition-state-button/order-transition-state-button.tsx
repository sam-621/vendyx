import { type FC } from 'react';

import { Button } from '@ebloc/theme';

import { OrderState } from '@/lib/ebloc/codegen/graphql';

import { OrderMarkAsSentOrderButton } from './mark-as-sent-order/mark-as-sent-order-button';

export const OrderTransitionOrderStateButton: FC<Props> = ({ orderState }) => {
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
    return <OrderMarkAsSentOrderButton />;
  }

  if (orderState === OrderState.Shipped) {
    return <Button type="button">Complete order</Button>;
  }

  return (
    <Button disabled type="button">
      Complete order
    </Button>
  );
};

type Props = {
  orderState: OrderState;
};
