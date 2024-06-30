import { type FC } from 'react';

import { Button, cn } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { useOptionDetailsContext } from '@/app/products/context';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { OptionDetailsForm } from '../option-details-form';
import {
  MAX_OPTIONS_ALLOWED,
  type OptionState,
  type OptionValueState
} from '../use-manage-options';
import { useNewOptionForm } from './use-new-option-form';

const NewOption: FC<Props> = ({ option, removeOption, updateOption, updateValues }) => {
  const { onSubmit } = useNewOptionForm();

  return (
    <OptionDetailsForm
      onSave={async () => await onSubmit(option, removeOption)}
      option={option}
      removeOption={removeOption}
      updateOption={updateOption}
      updateValues={updateValues}
      quitEditingMode={() => removeOption()}
    />
  );
};

export const NewOptionForm = ({
  defaultOptions
}: {
  defaultOptions: CommonProductFragment['options'] | undefined | null;
}) => {
  const { addOption, removeOption, updateOption, options, updateValues } =
    useOptionDetailsContext();

  if (!defaultOptions?.length && !options.length) return null;

  if (defaultOptions?.length === MAX_OPTIONS_ALLOWED) {
    return null;
  }

  return (
    <div className={cn('flex flex-col rounded-b-lg divide-y')}>
      {options.map(op => (
        <div key={op.id} className="p-4">
          <NewOption
            key={op.id}
            option={op}
            removeOption={() => removeOption(op.id)}
            updateOption={(name: string) => updateOption(op.id, name)}
            updateValues={updateValues}
          />
        </div>
      ))}

      {options.length + (defaultOptions?.length ?? 0) !== MAX_OPTIONS_ALLOWED && (
        <div className="flex h-14 hover:bg-muted/50 rounded-b-md">
          <Button
            type="button"
            variant="link"
            className="text-distinct hover:no-underline p-0 h-full w-full"
            onClick={addOption}
          >
            <PlusIcon size={16} /> Add option
          </Button>
        </div>
      )}
    </div>
  );
};

type Props = {
  option: OptionState;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
};
