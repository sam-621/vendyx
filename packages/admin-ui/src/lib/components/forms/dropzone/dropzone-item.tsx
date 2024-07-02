import { type FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox, cn } from '@ebloc/theme';
import { GripIcon } from 'lucide-react';

export const DropzoneItem: FC<Props> = ({ source, onClick, onCheck, checked, className }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: source
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn('relative group cursor-pointer flex-shrink-0', className)}
    >
      <div className="w-full h-full absolute group-hover:bg-muted/50"></div>
      <Checkbox
        id={source}
        className={cn(
          'opacity-0 data-[state=checked]:opacity-100 data-[state=checked]:text-white data-[state=checked]:bg-black border-black bg-white absolute top-1 left-1 cursor-auto group-hover:opacity-100'
        )}
        checked={checked}
        onCheckedChange={checked => onCheck(Boolean(checked))}
      />
      <GripIcon
        {...listeners}
        className="opacity-0 absolute top-1 right-1 group-hover:opacity-100 cursor-grab"
        size={16}
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
  checked: boolean;
  className?: string;
};
