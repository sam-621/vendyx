import { type FC } from 'react';

import { Button, Label } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { useStatesForm } from './use-states-form';

export const StatesForm: FC<Props> = ({ states: defaultStates, closeForm }) => {
  const { states, setStates, isLoading, onSave } = useStatesForm(defaultStates, closeForm);

  const hasNewStates = states.filter(s => s.name).length !== defaultStates.length;
  const someStateHasChanged = states.some(
    s =>
      defaultStates.find(d => d.id === s.id) &&
      defaultStates.find(d => d.id === s.id)?.name !== s.name
  );

  const isFormDirty = hasNewStates || someStateHasChanged;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <Label>Name</Label>
        {states.map((state, i) => (
          <FormInput
            key={state.id}
            defaultValue={state.name}
            onChange={e => {
              const content = e.target.value;
              const isTheLastOne = i === states.length - 1;

              const newState = states.map(s =>
                s.id === state.id ? { ...state, name: content } : s
              );

              if (isTheLastOne && content) {
                newState.push({ id: crypto.randomUUID(), name: '' });
              }

              if (isTheLastOne && !content) {
                newState.pop();
              }

              setStates(newState);
            }}
          />
        ))}
      </div>
      <div className="w-full flex justify-end">
        <Button onClick={onSave} isLoading={isLoading} disabled={!isFormDirty} type="button">
          Save
        </Button>
      </div>
    </div>
  );
};

type Props = {
  states: CommonCountryFragment['states']['items'];
  closeForm: () => void;
};
