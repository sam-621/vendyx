import { type FC } from 'react';

import { Button, Label } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useVariantsContext } from '@/app/inventory/context';

export const VariantListingHeader: FC<Props> = ({ canShow }) => {
  const { checkedVariants } = useVariantsContext();

  if (!canShow) {
    return null;
  }

  return (
    <div className="flex justify-between items-center border-y h-12 px-6">
      <Label>Variants</Label>
      {checkedVariants.length > 0 && (
        <Button variant="link" className="gap-1 text-destructive">
          <Trash2Icon size={16} />
          Delete selected
        </Button>
      )}
    </div>
  );
};

type Props = {
  canShow: boolean;
};
