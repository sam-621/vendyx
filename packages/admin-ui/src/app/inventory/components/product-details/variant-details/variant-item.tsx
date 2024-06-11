import { type FC } from 'react';

import { Button } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { FormInput } from '@/app/components';
import { useProductDetailsContext } from '@/app/inventory/context';
import { InventoryKeys, useRemoveVariant } from '@/app/inventory/hooks';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

export const VariantItem: FC<Props> = ({ variant }) => {
  const { product } = useProductDetailsContext();
  const { removeVariant } = useRemoveVariant();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1">
        {variant.optionValues?.map((optionValue, i) => (
          <>
            <span key={optionValue.id}>{optionValue.value}</span>
            {variant.optionValues?.length !== i + 1 && <span>/</span>}
          </>
        ))}
      </div>
      <div className="flex gap-2 items-end">
        <FormInput label="Price" placeholder="$ 0.00" />
        <FormInput label="SKU" placeholder="SKU - 000" />
        <FormInput label="Quantity" placeholder="0" />
        <Button
          variant="ghost"
          size="icon"
          className="p-2"
          type="button"
          onClick={async () => {
            const optionValues = variant.optionValues?.map(({ value }) => value);

            await removeVariant(variant.id);
            await queryClient.invalidateQueries({
              queryKey: InventoryKeys.single(product?.slug ?? '')
            });

            notification.success(`Variant ${optionValues?.join(' / ')} removed`);
          }}
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    </div>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
};
