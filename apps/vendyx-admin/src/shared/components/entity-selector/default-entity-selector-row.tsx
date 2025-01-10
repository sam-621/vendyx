import { type FC } from 'react';

import { Checkbox } from '../ui/checkbox';

export const DefaultEntitySelectorRow: FC<Props> = ({ label, checked, onCheckedChange }) => {
  return (
    <label
      htmlFor={`state-${label}`}
      className="flex items-center gap-4 py-4 hover:bg-muted cursor-pointer border-b"
    >
      <Checkbox
        id={`state-${label}`}
        className="ml-8"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <p>{label}</p>
    </label>
  );
};

type Props = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};
