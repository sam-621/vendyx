import { type FC } from 'react';

import { Button } from '@ebloc/theme';
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';

import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { RemoveVariantButton } from './remove-variant-button';
import { useUpdateVariantForm } from './use-update-variant-form';

export const VariantItem: FC<Props> = ({ variant }) => {
  const { onSubmit, register, formState } = useUpdateVariantForm(variant);
  const { errors, isSubmitting } = formState;

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
          label="Quantity"
          placeholder="0"
          error={errors.quantity?.message}
        />
        <Button
          disabled={isSubmitting}
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
};
