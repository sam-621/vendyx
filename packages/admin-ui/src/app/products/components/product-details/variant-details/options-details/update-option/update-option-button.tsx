import { type FC } from 'react';

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

export const UpdateOptionButton: FC<Props> = ({ optionValuesRemoved, onUpdate }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size="sm">
          Done
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Updating this option will remove some variants
          </AlertDialogTitle>
          <AlertDialogDescription>
            Variants with option values <strong>{optionValuesRemoved.join(', ')}</strong> will be
            removed from your store. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onUpdate}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  optionValuesRemoved: string[];
  onUpdate: () => void;
};
