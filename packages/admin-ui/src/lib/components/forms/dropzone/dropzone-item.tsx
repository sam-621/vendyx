import { type FC } from 'react';

import { Checkbox, cn } from '@ebloc/theme';

export const DropzoneItem: FC<Props> = ({ source, onClick, onCheck, className }) => {
  return (
    <div className={cn('relative group cursor-pointer', className)}>
      <div className="w-full h-full absolute group-hover:bg-muted/50" onClick={onClick}></div>
      <Checkbox
        className="opacity-0 data-[state=checked]:opacity-100 data-[state=checked]:text-white data-[state=checked]:bg-black border-black bg-white absolute top-1 left-1 cursor-auto group-hover:opacity-100"
        onCheckedChange={checked => onCheck(Boolean(checked))}
      />
      <img
        src={source}
        alt="Asset"
        className="rounded-md w-full h-full object-cover flex-shrink-0"
      />
    </div>
  );
};

type Props = {
  source: string;
  onClick: () => void;
  onCheck: (checked: boolean) => void;
  className?: string;
};
