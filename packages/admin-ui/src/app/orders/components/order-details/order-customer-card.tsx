import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { clean } from '@ebloc/common';
import { Card, CardContent, CardHeader, CardTitle, Label } from '@ebloc/theme';

import { type CommonOrderFragment } from '@/lib/ebloc/codegen/graphql';
import { formatPhoneNumber, getFullName } from '@/lib/utils';

export const OrderCustomerCard: FC<Props> = ({ customer, address }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        {customer ? (
          <div className="flex flex-col gap-2">
            <Link
              to={`/customers/${customer.id}`}
              className="font-medium text-distinct hover:underline"
            >
              {getFullName(clean(customer))}
            </Link>
            <p>{customer.email}</p>
            {customer.phoneNumber && <p>{formatPhoneNumber(clean(customer))}</p>}
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
