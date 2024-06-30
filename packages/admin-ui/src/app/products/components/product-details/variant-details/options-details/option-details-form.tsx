import { type FC, useState } from 'react';

import { Button, cn, Input, Label } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useOptionDetailsContext, useProductDetailsContext } from '@/app/products/context';
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
  isUpdating,
  quitEditingMode
}) => {
  const { product } = useProductDetailsContext();
  const { options } = useOptionDetailsContext();
  const [isLoading, setIsLoading] = useState(false);
  // This is needed because if some option values are removed, we need to show the alert dialog saying that some variants will be removed
  const [optionValuesRemoved, setOptionValuesRemoved] = useState<string[]>([]);

  const onSubmit = async () => {
    setIsLoading(true);
    await onSave();
    setIsLoading(false);
  };

  const optionValuesRepeated = option.values
    .filter(v => v.value)
    .filter((v, i, self) => self.findIndex(t => t.value === v.value) !== i);

  const isOptionNameDuplicated = [...(product?.options ?? []), ...options]
    .filter(op => op.id !== option.id)
    .some(op => op.name === option.name);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <FormInput
          label="Option"
          placeholder="Size"
          defaultValue={option.name}
          onChange={e => updateOption(e.target.value)}
          error={
            isOptionNameDuplicated
              ? `You already have an option called "${option.name}"`
              : undefined
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Values</Label>
        {option.values.map((v, i) => {
          const valueRepeated = optionValuesRepeated.find(value => value.id === v.id);
          const isLast = i === option.values.length - 1;

          return (
            <div className="flex items-start gap-4 " key={v.id}>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  className={cn({
                    'border-destructive focus-visible:ring-destructive': valueRepeated
                  })}
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
                {valueRepeated && (
                  <p className="text-sm text-red-500">
                    Already exists an option value called &quot;
                    {valueRepeated?.value}&quot;{' '}
                  </p>
                )}
              </div>

              {!isLast && (
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
          );
        })}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={quitEditingMode}>
            Cancel
          </Button>
          {isUpdating && Boolean(optionValuesRemoved.length) ? (
            <UpdateOptionButton onUpdate={onSubmit} optionValuesRemoved={optionValuesRemoved} />
          ) : (
            <Button
              type="button"
              size="sm"
              disabled={
                isLoading || Boolean(optionValuesRepeated.length) || Boolean(isOptionNameDuplicated)
              }
              onClick={onSubmit}
            >
              Done
            </Button>
          )}
        </div>
        {isUpdating ? (
          <RemoveOptionButton option={option} onRemove={removeOption} />
        ) : (
          <Button type="button" variant="destructive" size="sm" onClick={removeOption}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

type Props = {
  option: OptionState;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
  onSave: () => Promise<void>;
  isUpdating?: boolean;
  quitEditingMode?: () => void;
};
