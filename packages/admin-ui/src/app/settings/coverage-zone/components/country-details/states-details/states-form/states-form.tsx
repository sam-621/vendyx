import { type FC, useState } from 'react';

import { Button } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

export const StatesForm: FC<Props> = ({ states: defaultStates }) => {
  const [states, setStates] = useState([...defaultStates, { id: crypto.randomUUID(), name: '' }]);

  const onSave = () => {
    const oldStates = defaultStates.map(s => s.id);

    const newStates = states.filter(s => !oldStates.includes(s.id)).filter(s => s.name);
    const updatedStates = states.filter(
      s =>
        defaultStates.find(d => d.id === s.id) &&
        defaultStates.find(d => d.id === s.id)?.name !== s.name
    );

    console.log({
      newStates,
      updatedStates
    });
  };

  return (
    <div className="flex flex-col gap-4">
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
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

type Props = {
  states: CommonCountryFragment['states']['items'];
};
