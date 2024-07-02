import { type FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox, cn } from '@ebloc/theme';
import { GripIcon } from 'lucide-react';

export const DropzoneItem: FC<Props> = ({
  source,
  canSort,
  onClick,
  onCheck,
  checked,
  className
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: source
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn('relative group cursor-pointer flex-shrink-0', className)}
    >
      <div className="w-full h-full absolute group-hover:bg-muted/50" onClick={onClick}></div>
      <Checkbox
        id={source}
        className={cn(
          'opacity-0 data-[state=checked]:opacity-100 data-[state=checked]:text-white data-[state=checked]:bg-black border-black bg-white absolute top-1 left-1 cursor-auto group-hover:opacity-100'
        )}
        checked={checked}
        onCheckedChange={checked => onCheck(Boolean(checked))}
      />
      {canSort && (
        <GripIcon
          {...listeners}
          className="opacity-0 absolute top-1 right-1 group-hover:opacity-100 cursor-grab"
          size={16}
        />
      )}
      <img
        src={source}
        alt="Asset"
        className="rounded-md w-full h-full object-cover flex-shrink-0"
      />
    </div>
  );
};

type Props = {
  /**
   * The source of the image to be displayed
   */
  source: string;
  /**
   * Whether the item can be sorted. If true, a grip icon will be displayed and the item will be able to be dragged.
   * Disabling this option could be useful when you need to use this component as a simple image preview or your item is out of the sortable context.
   */
  canSort: boolean;
  /**
   * Whether the item is checked
   */
  checked: boolean;
  /**
   * Callback to be called when the item is clicked
   */
  onClick: () => void;
  /**
   * Callback to be called when the item is checked
   */
  onCheck: (checked: boolean) => void;
  className?: string;
};
