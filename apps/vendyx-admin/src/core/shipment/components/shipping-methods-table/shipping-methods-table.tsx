import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api/types';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table';
import { cn } from '@/shared/utils/theme';

import { formatShippingMethodPreviewPrice } from '../../utils/shipment.utils';
import { AddShippingMethodButton } from '../add-shipping-method/add-shipping-method-button';
import { RemoveSHippingMethodButton } from '../remove-shipping-method/remove-shipping-method-button';
import { UpdateShippingMethodButton } from '../update-shipping-method/update-shipping-method-button';

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
                    <UpdateShippingMethodButton method={method} />
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
