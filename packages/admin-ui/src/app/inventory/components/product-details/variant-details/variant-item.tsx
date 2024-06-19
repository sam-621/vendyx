import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { FormInput } from '@/app/components';
import {
  InventoryKeys,
  useGetProductDetails,
  useRemoveOptionValues,
  useRemoveVariant
} from '@/app/inventory/hooks';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const VariantItem: FC<Props> = ({ variant }) => {
  const { slug } = useParams();
  const { product } = useGetProductDetails(slug ?? '');
  const { removeVariant } = useRemoveVariant();
  const { removeOptionValues } = useRemoveOptionValues();

  const onRemove = async () => {
    await removeUnusedOptionValues();
    const optionValues = variant.optionValues?.map(({ value }) => value);

    await removeVariant(variant.id);
    await queryClient.invalidateQueries({
      queryKey: InventoryKeys.single(product?.slug ?? '')
    });

    notification.success(`Variant ${optionValues?.join(' / ')} removed`);
  };

  const removeUnusedOptionValues = async () => {
    const variantsWithoutRemoved =
      product?.variants?.items?.filter(({ id: currentId }) => currentId !== variant.id) ?? [];

    const optionValuesInUse = variantsWithoutRemoved
      .map(variant => variant.optionValues)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesInProduct = product?.options
      .map(option => option.values)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesToDelete = optionValuesInProduct?.filter(
      optionValue => !optionValuesInUse.includes(optionValue)
    );

    if (optionValuesToDelete?.length) {
      await removeOptionValues(optionValuesToDelete);
    }
  };

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
        <Button variant="ghost" size="icon" className="p-2" type="button" onClick={onRemove}>
          <Trash2Icon size={16} />
        </Button>
      </div>
    </div>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
};
