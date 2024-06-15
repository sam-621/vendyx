import { type FC } from 'react';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { OptionDetailsForm } from '../option-details-form';
import { useManageOptionsStates } from '../use-manage-options';

export const UpdateOptionForm: FC<Props> = ({ option }) => {
  const { options, updateValues, removeOption, updateOption } = useManageOptionsStates([
    {
      id: option.id,
      name: option.name,
      values: option.values?.map(v => ({ id: v.id, value: v.value })) ?? []
    }
  ]);

  return (
    <OptionDetailsForm
      onSave={async () => {}}
      option={options[0]}
      updateValues={updateValues}
      removeOption={() => removeOption(options[0].id)}
      updateOption={(name: string) => updateOption(options[0].id, name)}
    />
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
};
