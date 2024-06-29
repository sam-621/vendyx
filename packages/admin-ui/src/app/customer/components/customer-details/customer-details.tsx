import { type FC } from 'react';

import { getFormattedPrice } from '@ebloc/common';
import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';

import { CustomerContactInfoForm } from './customer-contact-info/customer-contact-info-form';
import { CustomerOrdersTable } from './customer-orders/customer-orders-table';
import { CustomerStatusSwitch } from './customer-status/customer-status-switch';

export const CustomerDetails: FC<Props> = ({ customer }) => {
  const orders = customer.orders.items;
  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CustomerContactInfoForm customer={customer} />

        <CustomerOrdersTable orders={customer.orders.items} />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CustomerStatusSwitch enabled={customer.enabled} />

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <p>
              Orders: <span>{orders.length}</span>
            </p>
            <p>
              Total spent: <span>{<span>{getFormattedPrice(totalSpent)}</span>}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
