import { type FC, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@ebloc/theme';
import { Loader2Icon, XIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

export const RemoveCountryButton: FC<Props> = ({ country, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <XIcon size={16} className="cursor-pointer" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove Country &quot;{country.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will no longer be able to ship products in &quot;{country.name}&quot;. This action
            cannot be undone.
          </AlertDialogDescription>
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
  country: CommonCountryFragment;
  onRemove: () => Promise<void>;
};
