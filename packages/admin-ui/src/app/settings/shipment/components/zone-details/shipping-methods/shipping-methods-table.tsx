import { type FC } from 'react';

import {
  Button,
  Card,
  CardContent,
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

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

export const ShippingMethodsTable: FC<Props> = ({ zone }) => {
  const shippingMethods = zone.shippingMethods.items;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Shipping methods</CardTitle>
        <div>
          <Button variant="secondary" size="sm" className="gap-2">
            <PlusIcon size={16} />
            Add Shipping method
          </Button>
        </div>
      </CardHeader>

      {Boolean(shippingMethods.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map(method => (
                <TableRow key={method.id}>
                  <TableCell>
                    <span>{method.name}</span>
                  </TableCell>
                  <TableCell>$100.00</TableCell>
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
  zone: CommonZoneFragment;
};
