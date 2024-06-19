import { type FC } from 'react';

import { Button, Input, Label, Separator } from '@ebloc/theme';
import { PlusIcon, Trash2Icon } from 'lucide-react';

import { FormInput } from '@/lib/components';
import { useOptionDetailsContext } from '@/app/inventory/context';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { type OptionState, OptionValueState } from '../use-manage-options';
import { useNewOptionForm } from './use-new-option-form';

const NewOption: FC<Props> = ({ option, removeOption, updateOption, updateValues }) => {
  const { onSubmit, isLoading } = useNewOptionForm();

  return (
    <form className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <FormInput
          label="Option"
          placeholder="Size"
          defaultValue={option.name}
          onChange={e => updateOption(e.target.value)}
        />
        <Button type="button" variant="ghost" size="icon" onClick={removeOption}>
          <Trash2Icon size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Values</Label>
        {option.values.map((v, i) => (
          <Input
            key={v.id}
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
        ))}
      </div>
      <div>
        <Button
          type="button"
          disabled={isLoading}
          onClick={async () => await onSubmit(option, removeOption)}
          variant="outline"
        >
          Done
        </Button>
      </div>
    </form>
  );
};

export const NewOptionForm = ({
  defaultOptions
}: {
  defaultOptions: CommonProductFragment['options'] | undefined | null;
}) => {
  const { addOption, removeOption, updateOption, options, updateValues } =
    useOptionDetailsContext();

  if (!defaultOptions?.length && !options.length) return;

  return (
    <>
      <div className="flex flex-col gap-4">
        {options.map((op, i) => (
          <>
            <NewOption
              key={op.id}
              option={op}
              removeOption={() => removeOption(op.id)}
              updateOption={(name: string) => updateOption(op.id, name)}
              updateValues={updateValues}
            />
            {/* Only add separator when are more than one options and is not the last one */}
            {options.length > 1 && i !== options.length - 1 && <Separator />}
          </>
        ))}
      </div>

      <div>
        <Separator />
        <Button
          type="button"
          variant="link"
          className="text-distinct hover:no-underline"
          onClick={addOption}
        >
          <PlusIcon size={16} /> Add option
        </Button>
        <Separator />
      </div>
    </>
  );
};

type Props = {
  option: OptionState;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
};
