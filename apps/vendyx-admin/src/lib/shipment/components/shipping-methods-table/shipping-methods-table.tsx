import { PlusIcon } from 'lucide-react';

import { Button, Card, CardHeader, CardTitle } from '@/lib/shared/components';

export const ShippingMethodsTable = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Shipping methods</CardTitle>
        <div>
          {/* <AddShippingMethod zoneId={zone.id} /> */}
          <Button variant="secondary" size="sm" className="gap-2">
            <PlusIcon size={16} />
            Add Shipping method
          </Button>
        </div>
      </CardHeader>

      {/* {Boolean(shippingMethods.length) && (
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
                    <UpdateShippingMethodForm zoneId={zone.id} shippingMethod={method} />
                  </TableCell>
                  <TableCell>{formatShippingMethodPreviewPrice(method.pricePreview)}</TableCell>
                  <TableCell>
                    <Badge variant={method.enabled ? 'default' : 'secondary'}>
                      {method.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[32px]">
                    <RemoveShippingMethodButton zoneId={zone.id} shippingMethod={method} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )} */}
    </Card>
  );
};
