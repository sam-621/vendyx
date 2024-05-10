import { type FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle, Label } from '@vendyx/theme';

import { type CommonOrderFragment } from '@/lib/vendyx/codegen/graphql';

// TODO: Format phone number to +52 667 1624 203
export const OrderCustomerCard: FC<Props> = ({ customer, address }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cliente</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        {customer ? (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-distinct">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p>{customer?.email}</p>
            {customer?.phoneNumber && (
              <p>{`+ ${customer?.phoneCountryCode} ${customer?.phoneNumber}`}</p>
            )}
          </div>
        ) : (
          <p>Invitado</p>
        )}
        {address && (
          <div className="flex flex-col gap-2">
            <Label className="text-base">Dirección</Label>
            <p>{address?.streetLine1}</p>
            {address?.streetLine2 && <p>{address.streetLine2}</p>}
            <p>
              {address?.postalCode} {address?.city}, {address?.province}
            </p>
            <p>{address?.country}</p>
            <p>
              +{address?.phoneCountryCode} {address?.phoneNumber}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  customer: CommonOrderFragment['customer'];
  address: CommonOrderFragment['shippingAddress'];
};
