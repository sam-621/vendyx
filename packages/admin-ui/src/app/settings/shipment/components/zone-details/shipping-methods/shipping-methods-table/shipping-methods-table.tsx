import { type FC } from 'react';

import {
  Badge,
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

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { formatShippingMethodPreviewPrice } from '../../../../utils';
import { AddShippingMethod } from '../add-shipping-method/add-shipping-method-form';
import { ShippingMethodsTableActions } from './shipping-methods-table-actions';

export const ShippingMethodsTable: FC<Props> = ({ zone }) => {
  const shippingMethods = zone.shippingMethods.items;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Shipping methods</CardTitle>
        <div>
          <AddShippingMethod zoneId={zone.id} />
        </div>
      </CardHeader>

      {Boolean(shippingMethods.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map(method => (
                <TableRow key={method.id}>
                  <TableCell>
                    <span>{method.name}</span>
                  </TableCell>
                  <TableCell>{formatShippingMethodPreviewPrice(method.pricePreview)}</TableCell>
                  <TableCell>
                    <Badge variant={method.enabled ? 'default' : 'secondary'}>
                      {method.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[32px]">
                    <ShippingMethodsTableActions zoneId={zone.id} shippingMethod={method} />
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
  zone: CommonZoneFragment;
};
