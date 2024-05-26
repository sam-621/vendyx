import { type FC } from 'react';

import { getFormattedPrice } from '@vendyx/common';
import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

import { type CommonOrderFragment } from '@/lib/vendyx/codegen/graphql';

export const OrderShipmentCard: FC<Props> = ({ shipment }) => {
  if (!shipment) return null;

  const { method } = shipment;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Method: <span className="font-medium text-distinct">{method.name}</span>
          </p>
          <p>
            Amount: <span>{getFormattedPrice(shipment.amount)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  shipment: CommonOrderFragment['shipment'];
};
