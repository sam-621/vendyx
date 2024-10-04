import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api';
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
} from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

import { formatShippingMethodPreviewPrice } from '../../utils';
import { AddShippingMethodButton } from '../add-shipping-method';
import { RemoveSHippingMethodButton } from '../remove-shipping-method';

export const ShippingMethodsTable: FC<Props> = ({ shippingMethods }) => {
  const hasShippingMethods = Boolean(shippingMethods.length);

  return (
    <Card>
      <CardHeader
        className={cn('flex justify-between flex-row items-center', !hasShippingMethods && 'pb-6')}
      >
        <CardTitle>Shipping methods</CardTitle>
        <div>
          {/* <AddShippingMethod zoneId={zone.id} /> */}
          <AddShippingMethodButton />
          {/* <Button variant="secondary" size="sm" className="gap-2">
            <PlusIcon size={16} />
            Add Shipping method
          </Button> */}
        </div>
      </CardHeader>

      {hasShippingMethods && (
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
                    {/* <UpdateShippingMethodForm zoneId={zone.id} shippingMethod={method} /> */}
                    <span>{method.name}</span>
                  </TableCell>
                  <TableCell>{formatShippingMethodPreviewPrice(method.pricePreview)}</TableCell>
                  <TableCell>
                    <Badge variant={method.enabled ? 'default' : 'secondary'}>
                      {method.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[32px]">
                    <RemoveSHippingMethodButton method={method} />
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
  shippingMethods: CommonZoneFragment['shippingMethods'];
};
