import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CountryKeys, useRemoveCountry } from '../../hooks';
import { RemoveCountryButton } from './remove-country-button';

export const CountriesTable: FC<Props> = ({ countries }) => {
  const { removeCountry } = useRemoveCountry();

  const [countryBeingRemoved, setCountryBeingRemoved] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Countries</CardTitle>
          <CardDescription>Countries where you can sell</CardDescription>
        </div>
        <div>
          <Link to="/settings/coverage-zones/new">
            <Button variant="secondary">
              <PlusIcon size={16} />
              Add Country
            </Button>
          </Link>
        </div>
      </CardHeader>

      {Boolean(countries.length) && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>States</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map(country => (
                <TableRow key={country.id}>
                  <TableCell className={cn(countryBeingRemoved === country.id && 'opacity-50')}>
                    <Link to={`/settings/coverage-zones/${country.id}`} className="hover:underline">
                      {country.name}
                    </Link>
                  </TableCell>
                  <TableCell className={cn(countryBeingRemoved === country.id && 'opacity-50')}>
                    {country.states.items.length}
                  </TableCell>
                  <TableCell className={cn(countryBeingRemoved === country.id && 'opacity-50')}>
                    <Badge variant={country.enabled ? 'default' : 'secondary'}>
                      {country.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RemoveCountryButton
                      country={country}
                      onRemove={async () => {
                        setCountryBeingRemoved(country.id);

                        const { error } = await removeCountry(country.id);

                        if (error) {
                          notification.error(error);
                          return;
                        }

                        await queryClient.invalidateQueries({ queryKey: CountryKeys.all });
                        notification.success('Country removed successfully');
                      }}
                    />
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
  countries: CommonCountryFragment[];
};
