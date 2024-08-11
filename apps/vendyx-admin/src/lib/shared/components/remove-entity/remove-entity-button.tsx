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
  trigger = 'button'
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger === 'button' ? (
          <Button isLoading={isLoading} type="button" variant="destructive">
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
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={async () => {
              await onRemove();
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
};
