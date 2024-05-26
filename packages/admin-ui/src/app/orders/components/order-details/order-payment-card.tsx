import { type FC } from 'react';

import { getFormattedPrice } from '@vendyx/common';
import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

import { type CommonOrderFragment } from '@/lib/vendyx/codegen/graphql';

export const OrderPaymentCard: FC<Props> = ({ payment }) => {
  if (!payment) return null;

  const method = payment.method;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pago</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Method: <span className="font-medium text-distinct">{method.name}</span>
          </p>
          <p>
            Transaction ID: <span>{payment.transactionId}</span>
          </p>
          <p>
            Amount: <span>{getFormattedPrice(payment.amount)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  payment: CommonOrderFragment['payment'];
};
