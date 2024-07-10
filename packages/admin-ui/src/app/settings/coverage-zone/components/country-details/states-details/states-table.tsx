import { type FC, useState } from 'react';

import { cn, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ebloc/theme';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { useCountryDetailsContext } from '../../../context';
import { CountryKeys, useRemoveStatesFromCountry } from '../../../hooks';
import { RemoveStateButton } from './remove-state-button/remove-state-button';

export const StatesTable: FC<Props> = ({ states }) => {
  const { country } = useCountryDetailsContext();
  const { removeStatesFromCountry } = useRemoveStatesFromCountry();

  const [stateBeingRemoved, setStateBeingRemoved] = useState<string | null>(null);

  const onRemove = (id: string) => async () => {
    if (!country) throw new Error('States table must be used inside a country context.');

    setStateBeingRemoved(id);

    await removeStatesFromCountry(country.id, [id]);
    await queryClient.invalidateQueries({ queryKey: CountryKeys.single(country.id) });
    notification.success('State removed successfully');
    setStateBeingRemoved(null);
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
                <TableCell className={cn('w-full', stateBeingRemoved === state.id && 'opacity-50')}>
                  <span>{state.name}</span>
                </TableCell>

                <TableCell>
                  <RemoveStateButton state={state} onRemove={onRemove(state.id)} />
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
