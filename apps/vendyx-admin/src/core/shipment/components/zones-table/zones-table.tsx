import { type FC } from 'react';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { type GetAllZonesQuery } from '@/api/types';
import { RawTableEmptyState } from '@/shared/components/empty-states/raw-table-empty-state';
import { DeliveryTruckIllustration } from '@/shared/components/illustrations/delivery-truck-illustration';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table';

export const ZonesTable: FC<Props> = ({ zones }) => {
  if (!zones.length) {
    return (
      <RawTableEmptyState
        illustration={<DeliveryTruckIllustration />}
        description="You haven't created any zones yet. Zones are used to group rates by geographical regions."
        action={{
          label: 'Add Zone',
          href: '/settings/shipments/new'
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Zones</CardTitle>
          <CardDescription>Group rates by zones</CardDescription>
        </div>
        <div>
          <Link href="shipments/new">
            <Button variant="secondary" size="sm" className="gap-2">
              <PlusIcon size={16} />
              Add Zone
            </Button>
          </Link>
        </div>
      </CardHeader>

      {Boolean(zones.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Rates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map(zone => (
                <TableRow key={zone.id}>
                  <TableCell>
                    <Link href={`shipments/${zone.id}`} className="hover:underline">
                      <span>{zone.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{zone.shippingMethods.length}</TableCell>
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
  zones: GetAllZonesQuery['zones'];
};
