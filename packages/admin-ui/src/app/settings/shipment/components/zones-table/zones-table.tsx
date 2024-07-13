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

import { type GetZonesQuery } from '@/lib/ebloc/codegen/graphql';

export const ZonesTable: FC<Props> = ({ zones }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Zones</CardTitle>
          <CardDescription>Group rates by zones</CardDescription>
        </div>
        <div>
          <Link to="/settings/countries/new">
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
                    <Link to={`/settings/shipments/${zone.id}`} className="hover:underline">
                      <span>{zone.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{zone.shippingMethods.count}</TableCell>
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
  zones: GetZonesQuery['zones']['items'];
};
