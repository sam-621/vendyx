import { type FC } from 'react';
import { Link } from 'react-router-dom';

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
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

export const CountriesTable: FC<Props> = ({ countries }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <div>
          <CardTitle>Countries</CardTitle>
          <CardDescription>Countries where you can sell</CardDescription>
        </div>
        <div>
          <Link to="/settings/coverage-zone/new">
            <Button variant="secondary">
              <PlusIcon size={16} />
              Add Country
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>States</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!countries.length ? (
              <h1>empty state</h1>
            ) : (
              <>
                {countries.map(country => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <Link
                        to={`/settings/coverage-zones/${country.id}`}
                        className="hover:underline"
                      >
                        {country.name}
                      </Link>
                    </TableCell>
                    <TableCell>{country.states.items.length}</TableCell>
                    <TableCell>
                      <Badge variant={country.enabled ? 'default' : 'secondary'}>
                        {country.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  countries: CommonCountryFragment[];
};
