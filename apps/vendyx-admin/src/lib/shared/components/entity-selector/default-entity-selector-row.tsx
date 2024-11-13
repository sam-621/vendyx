import { type FC } from 'react';

import { Checkbox } from '../ui';

export const DefaultEntitySelectorRow: FC<Props> = ({ label, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center border-b pl-6 w-full sticky top-0 bg-background">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className="flex items-center gap-4 px-6 py-4 cursor-pointer">
        <p>{label}</p>
      </div>
    </div>
  );
};

type Props = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};
