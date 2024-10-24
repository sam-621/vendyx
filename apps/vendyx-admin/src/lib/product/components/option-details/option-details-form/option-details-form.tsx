import { type FC } from 'react';

import { Trash2Icon } from 'lucide-react';

import { Button, Input, Label } from '@/lib/shared/components';
import { isFirst, isLast } from '@/lib/shared/utils';

import { type VariantContext } from '../../variant-details';
import { useOptionDetailsForm } from './use-option-details-form';

export const OptionDetailsForm: FC<Props> = ({ option }) => {
  const {
    name,
    setName,
    isOptionNameRepeated,
    values,
    valueRepeated,
    setValues,
    hasNoValues,
    onDone,
    onRemove,
    onCancel
  } = useOptionDetailsForm(option);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Option name</Label>
        <Input defaultValue={name} onChange={e => setName(e.target.value)} placeholder="Size" />
        {isOptionNameRepeated && (
          <p className="text-sm text-red-500">Already exists an option called &quot;{name}&quot;</p>
        )}
      </div>
      <div className="">
        <Label>Values</Label>

        <div className="flex flex-col gap-2 w-full mt-1">
          {values.map((value, i) => {
            const isRepeated = valueRepeated?.id === value.id;

            return (
              <div key={value.id} className="flex items-start gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    defaultValue={value.name}
                    placeholder={isFirst(i) ? 'S' : 'Value'}
                    onChange={e => {
                      const content = e.target.value;
                      const isTheLastOption = isLast(i, values);

                      const newState = values.map(v =>
                        v.id === value.id ? { ...v, name: content } : v
                      );

                      if (isTheLastOption && content && !isRepeated) {
                        newState.push({ id: Math.random().toString(), name: '' });
                      }

                      setValues(newState);
                    }}
                  />
                  {isRepeated && (
                    <p className="text-sm text-red-500">
                      Already exists an option value called &quot;
                      {value.name}&quot;
                    </p>
                  )}
                </div>
                {!isFirst(i) && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setValues(values => values.filter(v => v.id !== value.id))}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" size="sm" variant="destructive" onClick={onRemove}>
          Remove
        </Button>
        <div className="flex items-center gap-2">
          <Button type="button" size="sm" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={Boolean(valueRepeated) || isOptionNameRepeated || hasNoValues || !name}
            type="button"
            size="sm"
            onClick={onDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
