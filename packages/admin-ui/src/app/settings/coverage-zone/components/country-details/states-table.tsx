import { type FC } from 'react';
import { Link } from 'react-router-dom';

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

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

export const StatesTable: FC<Props> = ({ states }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center lg:pb-4">
        <div>
          <CardTitle>States</CardTitle>
          {/* <CardDescription>Countries where you can sell</CardDescription> */}
        </div>
        <div>
          <Link to="/settings/coverage-zone/new">
            <Button variant="secondary" size="sm">
              <PlusIcon className="mr-2" size={16} />
              Add State
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Shipments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!states.length ? (
              <h1>empty state</h1>
            ) : (
              <>
                {states.map(state => (
                  <TableRow key={state.id}>
                    <TableCell>{state.name}</TableCell>
                    <TableCell>{12}</TableCell>
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
  states: CommonCountryFragment['states']['items'];
};
