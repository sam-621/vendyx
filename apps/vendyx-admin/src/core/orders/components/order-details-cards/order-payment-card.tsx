import { type FC } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatPrice } from '@/shared/utils/formatters';

export const OrderPaymentCard: FC<Props> = ({ order }) => {
  const { payment } = order;

  if (!payment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Method: <span className="font-medium text-distinct">{payment.method}</span>
          </p>
          <p>
            Transaction ID: <span>{payment.transactionId}</span>
          </p>
          <p>
            Amount: <span>{formatPrice(payment.amount)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
