import { type FC, type ReactNode } from 'react';

import { Loader2Icon, XIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '../ui';

export const RemoveEntityButton: FC<Props> = ({
  title,
  description,
  onRemove,
  isLoading,
  trigger = 'button',
  className
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger === 'button' ? (
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="button"
            variant="destructive"
            size="sm"
            className={className}
          >
            Remove
          </Button>
        ) : isLoading ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <XIcon size={16} className="cursor-pointer" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">{title}</AlertDialogTitle>
          <AlertDialogDescription asChild={typeof description !== 'string'}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={() => {
              onRemove();
            }}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  title: string;
  description: ReactNode;
  onRemove: () => void;
  isLoading: boolean;
  trigger?: 'button' | 'icon';
  className?: string;
};
