import { type FC, useState } from 'react';

import { Badge, Button, Label } from '@ebloc/theme';
import { Edit2Icon } from 'lucide-react';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { UpdateOptionForm } from '../update-option/update-option-form';

export const OptionItem: FC<Props> = ({ option }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="p-4">
        <UpdateOptionForm quitEditingMode={() => setIsEditing(false)} option={option} />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4">
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
      <Button variant="ghost" onClick={() => setIsEditing(true)} size="icon">
        <Edit2Icon size={16} />
      </Button>
    </div>
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
};
