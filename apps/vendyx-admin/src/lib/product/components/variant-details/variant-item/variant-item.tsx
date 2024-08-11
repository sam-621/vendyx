import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import { Checkbox, Dropzone, Input } from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

export const VariantItem: FC<Props> = ({ variant, groupName }) => {
  const { variants, updateVariants } = useVariantContext();
  const inGroup = Boolean(groupName);

  const variantName = inGroup
    ? variant.values
        .filter(v => v.name !== groupName)
        .map(v => v.name)
        .join('/')
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
        <Input
          onChange={e =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, price: e.target.value } : v))
            )
          }
          value={variant.price}
          placeholder="$ 0.00"
        />
        <Input
          value={variant.stock}
          onChange={e =>
            updateVariants(
              variants.map(v => (v.id === variant.id ? { ...v, stock: Number(e.target.value) } : v))
            )
          }
          type="number"
          placeholder="0"
        />
      </div>
    </div>
  );
};

type Props = {
  variant: VariantContext['variants'][0];
  /**
   * Determines if the variant is being rendered inside a group
   */
  groupName?: string;
};
