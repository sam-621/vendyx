import { type FC, useState } from 'react';

import { Checkbox, cn } from '@ebloc/theme';

import { getVariantName } from '@/app/inventory/utils';
import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { useUpdateVariantForm } from './use-update-variant-form';

export const VariantItem: FC<Props> = ({ variant, inGroup }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { register, formState } = useUpdateVariantForm(variant);

  const { errors } = formState;
  // when in group, the first option value is the group name so we skip it
  const variantName = getVariantName(
    inGroup ? variant.optionValues?.slice(1, 3) : variant.optionValues
  );

  return (
    <div
      className={cn(
        'flex justify-between items-center px-6 pl-10 hover:bg-muted/50 py-4',
        isChecked && 'bg-muted/50'
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
        <span>{variantName}</span>
      </div>
      <div className="flex gap-2 items-end">
        <FormInput {...register('sku')} placeholder="SKU - 000" error={errors.sku?.message} />
        <FormInput
          {...register('price')}
          placeholder="$ 0.00"
          error={errors.price?.message}
          onFocus={e => e.target.select()}
        />
        <FormInput
          {...register('quantity')}
          placeholder="0"
          error={errors.quantity?.message}
          onFocus={e => e.target.select()}
        />
      </div>
    </div>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
  inGroup?: boolean;
};
