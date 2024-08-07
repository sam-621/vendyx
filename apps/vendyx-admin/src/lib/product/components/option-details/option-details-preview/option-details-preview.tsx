import { type FC } from 'react';

import { Badge, Label } from '@/lib/shared/components';

import { useVariantContext, type VariantContext } from '../../../contexts';

export const OptionDetailsPreview: FC<Props> = ({ option }) => {
  const { updateOption } = useVariantContext();

  return (
    <button
      type="button"
      className="hover:bg-muted/50 w-full flex flex-col gap-4 p-4 "
      onClick={() => updateOption(option.id, { ...option, isEditing: true })}
    >
      <Label>{option.name}</Label>
      <div className="flex items-center gap-2">
        {option.values.map(value => (
          <Badge key={value} variant="secondary">
            {value}
          </Badge>
        ))}
      </div>
    </button>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
