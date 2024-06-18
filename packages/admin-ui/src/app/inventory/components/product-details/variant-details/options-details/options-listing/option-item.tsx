import { type FC, useState } from 'react';

import { Badge, Label } from '@ebloc/theme';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { UpdateOptionForm } from '../update-option/update-option-form';
import { OptionActions } from './option-actions';

export const OptionItem: FC<Props> = ({ option }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <UpdateOptionForm onFinish={() => setIsEditing(false)} option={option} />;
  }

  return (
    <div key={option.id} className="flex justify-between items-center">
      <div className="flex flex-col gap-4">
        <Label>{option.name}</Label>
        <div className="flex gap-2">
          {option.values?.map(value => (
            <Badge key={value.id} variant="secondary">
              {value.value}
            </Badge>
          ))}
        </div>
      </div>
      <OptionActions onEdit={() => setIsEditing(true)} onRemove={() => {}} />
    </div>
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
};
