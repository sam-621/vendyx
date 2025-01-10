import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/core/product/contexts/variant.context';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/utils/theme';
import { isUUID } from '@/shared/utils/validators';

import { useRemoveAssetVariant } from '../../variant-asset-uploader/use-remove-asset-variant';
import { useVariantAssetUploader } from '../../variant-asset-uploader/use-variant-asset-uploader';
import { VariantAssetUploader } from '../../variant-asset-uploader/variant-asset-uploader';
import { VariantItemDialogWrapper } from './variant-item-dialog-wrapper';

export const VariantItem: FC<Props> = ({ variant, groupName }) => {
  const { variants, updateVariants } = useVariantContext();
  const { addVariantImage, isLoading } = useVariantAssetUploader();
  const { removeVariantImage, isLoading: removeLoading } = useRemoveAssetVariant();

  const inGroup = Boolean(groupName);

  const variantImage = variant.image ?? '';

  const variantName = inGroup
    ? variant.values
        .filter(v => v.name !== groupName)
        .map(v => v.name)
        .join('/')
    : variant.values.map(v => v.name).join(' / ');

  const isPersistedVariant = isUUID(variant.id);

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
        <VariantAssetUploader
          isLoading={isLoading || removeLoading}
          size={inGroup ? 'sm' : 'md'}
          disabled={!isPersistedVariant} // can upload images only when the variant is saved
          image={variantImage}
          onRemove={() => {
            removeVariantImage([variant.id]);
          }}
          onUpload={file => {
            addVariantImage([variant.id], file);
          }}
        />
        <VariantItemDialogWrapper variant={variant}>
          <span className="hover:underline w-full cursor-pointer">{variantName}</span>
        </VariantItemDialogWrapper>
      </div>
      <div className="flex items-center gap-2 w-full">
        <Input
          isPrice
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
