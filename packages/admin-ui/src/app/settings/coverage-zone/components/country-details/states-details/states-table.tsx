import { type FC } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ebloc/theme';
import { XIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

export const StatesTable: FC<Props> = ({ states }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Shipments</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!states.length ? (
          <h1>empty state</h1>
        ) : (
          <>
            {states.map(state => (
              <TableRow key={state.id}>
                <TableCell>
                  <span className="w-full">{state.name}</span>
                </TableCell>
                <TableCell>{12}</TableCell>
                <TableCell>
                  <XIcon size={16} className="cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

type Props = {
  states: CommonCountryFragment['states']['items'];
};
