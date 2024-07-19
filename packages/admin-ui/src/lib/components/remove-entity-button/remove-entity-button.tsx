import { type FC, type ReactNode, useState } from 'react';

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
} from '@ebloc/theme';
import { Loader2Icon, XIcon } from 'lucide-react';

export const EntityRemoveButton: FC<Props> = ({
  title,
  description,
  onRemove,
  trigger = 'button'
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
              setIsLoading(true);
              await onRemove();
              setIsLoading(false);
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
  onRemove: () => Promise<void>;
  /**
   * @default 'button'
   */
  trigger?: Trigger;
};

type Trigger = 'icon' | 'button';
