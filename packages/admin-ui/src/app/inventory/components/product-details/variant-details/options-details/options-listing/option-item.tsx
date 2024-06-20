import { type FC, useState } from 'react';

import { Badge, cn, Label } from '@ebloc/theme';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { UpdateOptionForm } from '../update-option/update-option-form';

export const OptionItem: FC<Props> = ({ option, position }) => {
  const [isEditing, setIsEditing] = useState(false);

  const isFirst = position === 1;

  if (isEditing) {
    return (
      <div className="p-4">
        <UpdateOptionForm quitEditingMode={() => setIsEditing(false)} option={option} />
      </div>
    );
  }

  return (
    <div
      className={cn('flex justify-between items-center p-4 hover:bg-muted/50 cursor-pointer', {
        'rounded-t-md': isFirst
      })}
      onClick={() => setIsEditing(true)}
    >
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
    </div>
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
  position: number;
};
