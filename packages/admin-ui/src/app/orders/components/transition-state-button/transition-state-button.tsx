import { type FC } from 'react';

import { Button } from '@vendyx/theme';

import { OrderState } from '@/lib/vendyx/codegen/graphql';

export const TransitionOrderStateButton: FC<Props> = ({ orderState }) => {
  if (orderState === OrderState.Modifying) {
    return (
      <Button disabled type="button">
        Completar pedido
      </Button>
    );
  }

  if (orderState === OrderState.PaymentAdded) {
    return <Button type="button">Autorizar pago</Button>;
  }

  if (orderState === OrderState.PaymentAuthorized) {
    return <Button type="button">Marcar como enviado</Button>;
  }

  if (orderState === OrderState.Shipped) {
    return <Button type="button">Completar pedido</Button>;
  }

  return (
    <Button disabled type="button">
      Completar pedido
    </Button>
  );
};

type Props = {
  orderState: OrderState;
};
