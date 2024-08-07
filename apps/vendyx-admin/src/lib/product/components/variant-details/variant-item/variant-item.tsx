import { type FC } from 'react';

import { UploadIcon } from 'lucide-react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import { Checkbox, Input } from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

export const VariantItem: FC<Props> = ({ variant, inGroup }) => {
  const { variants, updateVariants } = useVariantContext();

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
          id="variant-1"
        />
        <div
          className={cn(
            'w-[60px] h-[60px] rounded-md border border-dashed flex items-center justify-center',
            inGroup && 'w-[48px] h-[48px]'
          )}
        >
          <UploadIcon size={16} />
        </div>
        <span>{variant.values.map(v => v.name).join(' / ')}</span>
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
