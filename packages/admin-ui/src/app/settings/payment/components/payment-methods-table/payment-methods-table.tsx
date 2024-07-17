import { type FC } from 'react';
import { Link } from 'react-router-dom';

import {
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
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { type GetAllPaymentMethodsQuery } from '@/lib/ebloc/codegen/graphql';

export const PaymentMethodsTable: FC<Props> = ({ paymentMethods }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Payment methods</CardTitle>
          <CardDescription>Configure payment methods for your store</CardDescription>
        </div>
        <div>
          <Link to="/settings/payments/new">
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
                <TableHead>Handler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map(method => (
                <TableRow key={method.id}>
                  <TableCell>
                    <Link to={`/settings/payments/${method.id}`} className="hover:underline">
                      <span>{method.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{method.handler.code}</TableCell>
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
  paymentMethods: GetAllPaymentMethodsQuery['paymentMethods']['items'];
};
