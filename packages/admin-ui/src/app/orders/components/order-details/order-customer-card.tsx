import { type FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle, Label } from '@ebloc/theme';

import { getFormattedPhoneNumber } from '@/lib/utils';
import { type CommonOrderFragment } from '@/lib/ebloc/codegen/graphql';

export const OrderCustomerCard: FC<Props> = ({ customer, address }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        {customer ? (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-distinct">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p>{customer.email}</p>
            {customer.phoneNumber && (
              <p>{`+ ${customer.phoneCountryCode} ${getFormattedPhoneNumber(customer.phoneNumber)}`}</p>
            )}
          </div>
        ) : (
          <p>Guest</p>
        )}
        {address && (
          <div className="flex flex-col gap-2">
            <Label className="text-base">Address</Label>
            <p>{address.streetLine1}</p>
            {address.streetLine2 && <p>{address.streetLine2}</p>}
            <p>
              {address.postalCode} {address?.city}, {address.province}
            </p>
            <p>{address.country}</p>
            {address.phoneCountryCode && address.phoneNumber && (
              <p>
                +{address.phoneCountryCode} {getFormattedPhoneNumber(address.phoneNumber)}
              </p>
            )}
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
