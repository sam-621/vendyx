import { type FC } from 'react';

import { Button } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { useStatesForm } from './use-states-form';

export const StatesForm: FC<Props> = ({ states: defaultStates, closeForm }) => {
  const { states, setStates, isLoading, onSubmit } = useStatesForm(defaultStates, closeForm);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
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
        <Button isLoading={isLoading} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

type Props = {
  states: CommonCountryFragment['states']['items'];
  closeForm: () => void;
};
