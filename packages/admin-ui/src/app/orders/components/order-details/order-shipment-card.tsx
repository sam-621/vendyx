import { type FC } from 'react';

import { getFormattedPrice } from '@ebloc/common';
import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { type CommonOrderFragment } from '@/lib/ebloc/codegen/graphql';

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
            Method: <span className="font-medium text-distinct">{method}</span>
          </p>
          <p>
            Amount: <span>{getFormattedPrice(shipment.amount)}</span>
          </p>
          {shipment.trackingCode && (
            <p>
              Tracking number: <span>{shipment.trackingCode}</span>
            </p>
          )}
          {shipment.carrier && (
            <p>
              Carrier: <span>{shipment.carrier}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  shipment: CommonOrderFragment['shipment'];
};
