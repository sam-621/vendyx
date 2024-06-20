import { type FC } from 'react';

import { getFormattedPrice } from '@ebloc/common';
import { Button } from '@ebloc/theme';
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';

import { getVariantName } from '@/app/inventory/utils';
import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { RemoveVariantButton } from './remove-variant-button';
import { useUpdateVariantForm } from './use-update-variant-form';

export const VariantItem: FC<Props> = ({ variant, inGroup }) => {
  const { onSubmit, register, formState, watch } = useUpdateVariantForm(variant);

  const { errors, isSubmitting } = formState;
  // when in group, the first option value is the group name so we skip it
  const variantName = getVariantName(
    inGroup ? variant.optionValues?.slice(1, 3) : variant.optionValues
  );

  const price = watch('price') ?? '';
  const quantity = watch('quantity');
  const sku = watch('sku');

  const formHasChanges =
    String(price) !== getFormattedPrice(variant.price).replace('$', '') ||
    String(quantity) !== String(variant.stock) ||
    sku !== variant.sku;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1">
        <span>{variantName}</span>
      </div>
      <div className="flex gap-2 items-end">
        <FormInput
          {...register('price')}
          label="Price"
          placeholder="$ 0.00"
          error={errors.price?.message}
        />
        <FormInput
          {...register('sku')}
          label="SKU"
          placeholder="SKU - 000"
          error={errors.sku?.message}
        />
        <FormInput
          {...register('quantity')}
          label="Stock"
          placeholder="0"
          error={errors.quantity?.message}
        />
        <Button
          disabled={isSubmitting || !formHasChanges}
          variant="ghost"
          size="icon"
          className="p-2"
          type="button"
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" size={16} />
          ) : (
            <SaveIcon size={16} />
          )}
        </Button>
        <RemoveVariantButton variant={variant} />
      </div>
    </div>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
  inGroup?: boolean;
};
