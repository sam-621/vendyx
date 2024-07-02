import { type FC } from 'react';

import { Switch } from '@ebloc/theme';

export const SwitchContainer: FC<Props> = ({ title, description, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border">
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="hidden lg:block text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

type Props = {
  title: string;
  description: string;
  onCheckedChange: (e: boolean) => void;
  checked: boolean;
};
