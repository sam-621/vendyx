import { type FC, useState } from 'react';

import { Button, Label } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useProductDetailsContext, useVariantsContext } from '@/app/inventory/context';
import { ProductKeys, useMassiveVariantRemove } from '@/app/inventory/hooks';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const VariantListHeader: FC<Props> = ({ canShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { product } = useProductDetailsContext();
  const { checkedVariants } = useVariantsContext();
  const { massiveVariantRemove } = useMassiveVariantRemove();

  if (!canShow) {
    return null;
  }

  const onRemove = async () => {
    if (!product) return;

    setIsLoading(true);

    await massiveVariantRemove(
      checkedVariants.map(id => id),
      product
    );

    await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product.slug) });

    setIsLoading(false);
    notification.success('Variants removed successfully');
  };

  return (
    <div className="flex justify-between items-center border-y h-12 px-6">
      <Label>{checkedVariants.length ? `${checkedVariants.length} selected` : 'Variants'}</Label>
      <div>
        {checkedVariants.length > 0 && (
          <Button
            isLoading={isLoading}
            variant="link"
            className="gap-1 text-destructive"
            onClick={onRemove}
          >
            {!isLoading && <Trash2Icon size={16} />}
            Delete selected
          </Button>
        )}
      </div>
    </div>
  );
};

type Props = {
  canShow: boolean;
};
