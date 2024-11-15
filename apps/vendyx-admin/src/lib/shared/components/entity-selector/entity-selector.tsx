import { type ReactElement } from 'react';

import { PlusIcon } from 'lucide-react';

import { cn } from '../../utils';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input
} from '../ui';

/**
 * Displays a dialog with a list of items to select from.
 * Supports custom rendering of items, search, and a done button.
 */
export const EntitySelector = <T,>({
  title,
  triggerText,
  items,
  renderItem,
  onDone,
  onSearch,
  isLoading,
  description,
  searchPlaceholder = 'Search...'
}: Props<T>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-distinct" variant="link" type="button">
          <PlusIcon size={16} />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="px-6">
            <Input placeholder={searchPlaceholder} onChange={e => onSearch(e.target.value)} />
          </div>
          <div>
            <div
              className={cn('border-y h-[calc(80px*2)] lg:h-[calc(80px*5)]', 'overflow-y-scroll')}
            >
              {isLoading ? <p>Loading...</p> : items.map(item => renderItem?.(item))}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 gap-2 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onDone}>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props<T> = {
  title: string;
  triggerText: string;
  onDone: () => void;
  items: T[];
  isLoading: boolean;
  renderItem: (item: T) => ReactElement;
  onSearch: (query: string) => void;
  description?: string;
  searchPlaceholder?: string;
};
