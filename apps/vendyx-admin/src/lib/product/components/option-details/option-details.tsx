import { type FC, useMemo, useState } from 'react';

import { Trash2Icon } from 'lucide-react';

import { Badge, Button, Input, Label } from '@/lib/shared/components';
import { isFirst } from '@/lib/shared/utils';

import { useVariantContext, type VariantContext } from '../../contexts';

export const OptionDetails: FC<Props> = ({ option }) => {
  const { updateOption, removeOption, options } = useVariantContext();
  const [name, setName] = useState(option.name);
  const [values, setValues] = useState<{ name: string; id: string }[]>(
    option.values.map(v => ({ name: v, id: Math.random().toString() }))
  );

  const isOptionNameRepeated = useMemo(
    () => options.some(option => name && option.name === name),
    [name, options]
  );

  const valueRepeated = useMemo(
    () =>
      values
        // Remove empty values
        .filter(v => v.name)
        // get repeated values [original, repeated]
        .filter((currentValue, i) => {
          return values.some((value, j) => {
            const isNotTheSameIndex = i !== j;
            const isTheSameName = value.name === currentValue.name;

            return isNotTheSameIndex && isTheSameName;
          });
        })
        // get the second repeated value (always the first will be the original)
        .find((_, i) => i !== 0),
    [values]
  );

  const hasNoValues = useMemo(() => values.filter(v => v.name).length === 0, [values]);

  const onDone = () => {
    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name).map(v => v.name),
      isEditing: false
    });
  };

  const onCancel = () => {
    if (!option.name) {
      removeOption(option.name);
      return;
    }

    updateOption(option.name, { ...option, isEditing: false });
  };

  const onRemove = () => {
    removeOption(option.id);
  };

  if (!option?.isEditing && option) {
    return (
      <button
        className="hover:bg-muted/50 w-full flex flex-col gap-4 p-4 "
        onClick={() => updateOption(option.name, { ...option, isEditing: true })}
      >
        <Label>{option.name}</Label>
        <div className="flex items-center gap-2">
          {option.values.map(value => (
            <Badge key={value} variant="secondary">
              {value}
            </Badge>
          ))}
        </div>
      </button>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Option name</Label>
        <Input defaultValue={name} onChange={e => setName(e.target.value)} placeholder="Size" />
        {isOptionNameRepeated && (
          <p className="text-sm text-red-500">Already exists an option called &quot;{name}&quot;</p>
        )}
      </div>
      <div>
        <Label>Values</Label>

        <div className="flex flex-col gap-2 w-full">
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
                      const isTheLastOption = i === values.length - 1;

                      const newState = values.map(v =>
                        v.id === value.id ? { ...v, name: content } : v
                      );

                      if (isTheLastOption && content && !isRepeated) {
                        newState.push({ id: Math.random().toString(), name: '' });
                      }

                      if (isTheLastOption && !content) {
                        newState.pop();
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
            disabled={Boolean(valueRepeated) || isOptionNameRepeated || hasNoValues}
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
