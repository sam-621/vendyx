import { type FC } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ebloc/theme';
import { XIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { useCountryDetailsContext } from '../../../context';
import { CountryKeys, useRemoveStatesFromCountry } from '../../../hooks';

export const StatesTable: FC<Props> = ({ states }) => {
  const { country } = useCountryDetailsContext();
  const { removeStatesFromCountry } = useRemoveStatesFromCountry();

  const onRemove = (id: string) => async () => {
    if (!country) throw new Error('States table must be used inside a country context.');

    await removeStatesFromCountry(country.id, [id]);
    await queryClient.invalidateQueries({ queryKey: CountryKeys.single(country.id) });
    notification.success('State removed successfully');
  };

  if (!states.length) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
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
                <TableCell className="w-full">
                  <span>{state.name}</span>
                </TableCell>

                <TableCell>
                  <XIcon onClick={onRemove(state.id)} size={16} className="cursor-pointer" />
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
