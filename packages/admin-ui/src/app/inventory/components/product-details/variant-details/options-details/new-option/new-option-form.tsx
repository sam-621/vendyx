import { type FC } from 'react';

import { Button, Separator } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { useOptionDetailsContext } from '@/app/inventory/context';
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

  if (!defaultOptions?.length && !options.length) return;

  if (defaultOptions?.length === MAX_OPTIONS_ALLOWED) {
    return <Separator />;
  }

  return (
    <div className="flex flex-col gap-4">
      {options.map((op, i) => (
        <div key={op.id} className="flex flex-col gap-4">
          <NewOption
            key={op.id}
            option={op}
            removeOption={() => removeOption(op.id)}
            updateOption={(name: string) => updateOption(op.id, name)}
            updateValues={updateValues}
          />
          {/* Only add separator when are more than one options and is not the last one */}
          {options.length > 1 && i !== options.length - 1 && <Separator />}
        </div>
      ))}

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
    </div>
  );
};

type Props = {
  option: OptionState;
  removeOption: () => void;
  updateOption: (name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
};
