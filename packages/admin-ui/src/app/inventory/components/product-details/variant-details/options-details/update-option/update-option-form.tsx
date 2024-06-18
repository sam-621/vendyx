import { type FC } from 'react';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { OptionDetailsForm } from '../option-details-form';
import { useUpdateOptionForm } from './use-update-option-form';

export const UpdateOptionForm: FC<Props> = ({ option, onFinish }) => {
  const { state, onRemove, onUpdate } = useUpdateOptionForm(option, onFinish);

  if (!state.options.length) return null;

  return (
    <OptionDetailsForm
      onSave={onUpdate}
      option={state.options[0]}
      updateValues={state.updateValues}
      removeOption={onRemove}
      updateOption={(name: string) => state.updateOption(state.options[0].id, name)}
    />
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
  onFinish: () => void;
};
