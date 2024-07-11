import { useState } from 'react';

import { useCountryDetailsContext } from '@/app/settings/coverage-zone/context';
import {
  CountryKeys,
  useAddStatesToCountry,
  useUpdateState
} from '@/app/settings/coverage-zone/hooks';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const useStatesForm = (
  defaultStates: CommonCountryFragment['states']['items'],
  closeForm: () => void
) => {
  const { country } = useCountryDetailsContext();
  const { addStateToCountry } = useAddStatesToCountry();
  const { updateState } = useUpdateState();

  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([...defaultStates, { id: crypto.randomUUID(), name: '' }]);

  const onSave = async () => {
    if (!country) throw new Error('States form must be used inside a country context.');

    const oldStates = defaultStates.map(s => s.id);

    const newStates = states.filter(s => !oldStates.includes(s.id)).filter(s => s.name);
    const updatedStates = states.filter(
      s =>
        defaultStates.find(d => d.id === s.id) &&
        defaultStates.find(d => d.id === s.id)?.name !== s.name
    );

    setIsLoading(true);

    // Add new states
    const addStateError = await addStateToCountry(
      country?.id ?? '',
      newStates.map(s => ({
        name: s.name
      }))
    );

    if (addStateError) {
      notification.error(addStateError);
      setIsLoading(false);
      return;
    }

    // Update existing states
    const results = await Promise.all(
      updatedStates.map(async s => await updateState(s.id, { name: s.name }))
    );
    const updateStatesError = results.find(r => r);

    if (updateStatesError) {
      notification.error(updateStatesError);
      setIsLoading(false);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CountryKeys.single(country.id) });
    notification.success('States updated successfully');
    setIsLoading(false);
    closeForm();
  };

  return {
    states,
    setStates,
    isLoading,
    onSave
  };
};
