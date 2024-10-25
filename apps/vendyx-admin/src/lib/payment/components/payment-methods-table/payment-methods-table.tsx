import { type FC } from 'react';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { type CommonPaymentMethodFragment } from '@/api/types';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/lib/shared/components';

import { PaymentMethodsTableEmptyState } from './payment-methods-table-empty-state';

export const PaymentMethodsTable: FC<Props> = ({ paymentMethods }) => {
  if (!paymentMethods.length) {
    return <PaymentMethodsTableEmptyState />;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Payment methods</CardTitle>
          <CardDescription>Configure payment methods for your store</CardDescription>
        </div>
        <div>
          <Link href="payments/new">
            <Button variant="secondary" size="sm" className="gap-2">
              <PlusIcon size={16} />
              Add payment method
            </Button>
          </Link>
        </div>
      </CardHeader>

      {Boolean(paymentMethods.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map(method => (
                <TableRow key={method.id}>
                  <TableCell>
                    <Link href={`payments/${method.id}`} className="hover:underline">
                      <span>{method.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={method.enabled ? 'default' : 'secondary'}>
                      {method.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

type Props = {
  paymentMethods: CommonPaymentMethodFragment[];
};
