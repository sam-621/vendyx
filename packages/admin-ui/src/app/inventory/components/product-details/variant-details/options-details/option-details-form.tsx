import { type FC, useState } from 'react';

import { Button, Input, Label } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { FormInput } from '@/lib/components';

import { RemoveOptionButton } from './update-option/remove-option-button';
import { UpdateOptionButton } from './update-option/update-option-button';
import { type OptionState, OptionValueState } from './use-manage-options';

export const OptionDetailsForm: FC<Props> = ({
  onSave,
  option,
  removeOption,
  updateOption,
  updateValues,
  isUpdating
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // This is needed because if some option values are removed, we need to show the alert dialog saying that some variants will be removed
  const [optionValuesRemoved, setOptionValuesRemoved] = useState<string[]>([]);

  const onSubmit = async () => {
    setIsLoading(true);
    await onSave();
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <FormInput
          label="Option"
          placeholder="Size"
          defaultValue={option.name}
          onChange={e => updateOption(e.target.value)}
        />
        {isUpdating ? (
          <RemoveOptionButton option={option} onRemove={removeOption} />
        ) : (
          <Button type="button" variant="ghost" size="icon" onClick={removeOption}>
            <Trash2Icon size={16} />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Values</Label>
        {option.values.map((v, i) => (
          <div className="flex items-end gap-4" key={v.id}>
            <Input
              defaultValue={v.value}
              placeholder="S"
              onChange={e => {
                const content = e.target.value;
                const isTheLastOption = i === option.values.length - 1;

                const newState: OptionValueState[] = option.values.map(value =>
                  value.id === v.id ? { ...v, value: content } : value
                );

                if (isTheLastOption && content) {
                  newState.push(new OptionValueState());
                }

                if (isTheLastOption && !content) {
                  newState.pop();
                }

                updateValues(option.id, newState);
              }}
            />
            {v.value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newState = option.values.filter(value => value.id !== v.id);

                  updateValues(option.id, newState);
                  setOptionValuesRemoved([...optionValuesRemoved, v.value]);
                }}
              >
                <Trash2Icon size={16} />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div>
        {isUpdating && Boolean(optionValuesRemoved.length) ? (
          <UpdateOptionButton onUpdate={onSubmit} optionValuesRemoved={optionValuesRemoved} />
        ) : (
          <Button type="button" disabled={isLoading} onClick={onSubmit} variant="outline">
            Done
          </Button>
        )}
      </div>
    </form>
  );
};

type Props = {
  option: OptionState;
  isUpdating?: boolean;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
  onSave: () => Promise<void>;
};
