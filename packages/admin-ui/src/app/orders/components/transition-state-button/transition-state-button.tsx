import { type FC } from 'react';

import { Button } from '@vendyx/theme';

import { OrderState } from '@/lib/vendyx/codegen/graphql';

export const TransitionOrderStateButton: FC<Props> = ({ orderState }) => {
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
    return <Button type="button">Mark as sent</Button>;
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
