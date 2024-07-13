import { type ReactElement, useState } from 'react';

import {
  Button,
  Checkbox,
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input
} from '@ebloc/theme';

export const EntitySearcherDialog = <TItem,>({
  title,
  description,
  items,
  item,
  onDone,
  defaultSelectedItems,
  emptyState,
  trigger
}: Props<TItem>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedItems);

  const handleCheck = (id: string) => (checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(p => p !== id));
    }
  };

  const sortedItems = items?.sort(a => {
    if (selectedIds.includes(a.id)) {
      return -1;
    }

    return 1;
  });

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {!sortedItems?.length ? (
          emptyState
        ) : (
          <>
            <div className="flex flex-col gap-6">
              <div className="px-6">
                <Input
                // onChange={e => setSearchValue(e.target.value)}
                // placeholder="Search..."
                />
              </div>
              <div>
                <div
                  className={cn(
                    'divide-y border-y h-[calc(80px*2)] lg:h-[calc(80px*5)]',
                    (sortedItems?.length ?? 0) > 5 && 'overflow-y-scroll'
                  )}
                >
                  {sortedItems?.map(p => (
                    <label
                      key={p.id}
                      htmlFor={`entity-${p.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
                    >
                      <Checkbox
                        id={`entity-${p.id}`}
                        defaultChecked={selectedIds.includes(p.id)}
                        onCheckedChange={handleCheck(p.id)}
                      />
                      {item(p)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="px-6 gap-2 ">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={async () => {
                  setIsLoading(true);
                  await onDone(selectedIds);
                  setIsLoading(false);
                }}
                isLoading={isLoading}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

type Props<TItem> = {
  title: string;
  description: string;
  items: EntitySearcherItem<TItem>[];
  item: (item: TItem) => ReactElement;
  defaultSelectedItems: string[];
  onDone: (selectedIds: string[]) => Promise<void>;
  trigger: ReactElement;
  emptyState: ReactElement;
};

export type EntitySearcherItem<T> = T & { id: string };
