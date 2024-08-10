import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import { Checkbox, Dropzone, Input } from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

export const VariantItem: FC<Props> = ({ variant, inGroup }) => {
  const { variants, updateVariants } = useVariantContext();

  const variantName = inGroup
    ? variant.values
        .slice(-2)
        .map(v => v.name)
        .join(' / ')
    : variant.values.map(v => v.name).join(' / ');

  return (
    <div className="flex items-center px-6 py-4 hover:bg-muted/50">
      <div className={cn('flex items-center gap-4 w-full', inGroup && 'pl-8')}>
        <Checkbox
          checked={variant.selected}
          onCheckedChange={checked =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, selected: Boolean(checked) } : v))
            )
          }
        />
        <Dropzone size={inGroup ? 'sm' : 'md'} onAcceptFiles={files => console.log(files)} />
        <span>{variantName}</span>
      </div>
      <div className="flex items-center gap-2 w-full">
        <Input defaultValue={variant.price} placeholder="$ 0.00" />
        <Input defaultValue={variant.stock} type="number" placeholder="0" />
      </div>
    </div>
  );
};

type Props = {
  variant: VariantContext['variants'][0];
  inGroup?: boolean;
};
