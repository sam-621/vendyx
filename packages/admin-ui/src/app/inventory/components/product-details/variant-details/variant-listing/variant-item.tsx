import { type FC, useEffect, useState } from 'react';

import { convertToCent, getFormattedPrice } from '@ebloc/common';
import { Checkbox, cn } from '@ebloc/theme';

import { useVariantsContext } from '@/app/inventory/context';
import { getVariantName } from '@/app/inventory/utils';
import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { parseFormattedPrice } from '@/lib/utils';

export const VariantItem: FC<Props> = ({ variant, inGroup }) => {
  const {
    addCheckedVariant,
    removeCheckedVariant,
    addVariantWithChanges,
    removeVariantWithChanges
  } = useVariantsContext();
  const [isChecked, setIsChecked] = useState(false);
  const [sku, setSku] = useState(variant.sku);
  const [price, setPrice] = useState(getFormattedPrice(variant.price).replace('$', ''));
  const [stock, setStock] = useState(String(variant.stock));

  // when in group, the first option value is the group name so we skip it
  const variantName = getVariantName(
    inGroup ? variant.optionValues?.slice(1, 3) : variant.optionValues
  );

  const onCheck = () => {
    if (isChecked) {
      removeCheckedVariant(variant.id);
    } else {
      addCheckedVariant(variant.id);
    }

    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const formattedPrice = convertToCent(Number(parseFormattedPrice(price)));

    if (
      formattedPrice === variant.price &&
      Number(stock) === variant.stock &&
      sku === variant.sku
    ) {
      removeVariantWithChanges(variant.id);
      return;
    }

    addVariantWithChanges(variant.id, {
      sku: sku === variant.sku ? undefined : sku,
      price: formattedPrice === variant.price ? undefined : formattedPrice,
      stock: Number(stock) === variant.stock ? undefined : Number(stock)
    });
  }, [sku, price, stock]);

  return (
    <div
      className={cn(
        'flex justify-between items-center px-6 pl-10 hover:bg-muted/50 py-4',
        isChecked && 'bg-muted/50'
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={isChecked} onCheckedChange={onCheck} />
        <span>{variantName}</span>
      </div>
      <div className="flex gap-2 items-end">
        <FormInput
          placeholder="SKU - 000"
          defaultValue={variant.sku}
          onChange={e => setSku(e.target.value)}
        />
        <FormInput
          placeholder="$ 0.00"
          defaultValue={getFormattedPrice(variant.price).replace('$', '')}
          onChange={e => setPrice(e.target.value)}
          onFocus={e => e.target.select()}
        />
        <FormInput
          placeholder="0"
          defaultValue={variant.stock}
          onChange={e => setStock(e.target.value)}
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
