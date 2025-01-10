import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/core/product/contexts/variant.context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { isUUID } from '@/shared/utils/validators';

import { useRemoveAssetVariant } from '../../variant-asset-uploader/use-remove-asset-variant';
import { useVariantAssetUploader } from '../../variant-asset-uploader/use-variant-asset-uploader';
import { VariantAssetUploader } from '../../variant-asset-uploader/variant-asset-uploader';
import { VariantItem } from '../variant-item/variant-item';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  const { variants: AllVariants, updateVariants } = useVariantContext();
  const { addVariantImage, isLoading } = useVariantAssetUploader();
  const { removeVariantImage, isLoading: removeLoading } = useRemoveAssetVariant();

  const groupImage = variants.filter(v => v.image).map(v => v.image ?? '')[0] ?? null;

  if (!variants.length) return null;

  const totalStock = variants.reduce((acc, variant) => acc + variant.stock, 0);
  const thereAreNewVariants = variants.some(v => !isUUID(v.id));

  return (
    <Accordion type="single" collapsible className="w-full pt-3">
      <AccordionItem value="item-1">
        <div className="flex items-center pb-4 px-6">
          <div className="w-full flex items-center gap-4">
            <Checkbox
              checked={variants.every(v => v.selected)}
              onCheckedChange={checked =>
                updateVariants(
                  AllVariants.map(v => {
                    if (variants.some(variant => variant.id === v.id)) {
                      return { ...v, selected: Boolean(checked) };
                    }

                    return v;
                  })
                )
              }
            />
            <VariantAssetUploader
              isLoading={isLoading || removeLoading}
              size="md"
              disabled={thereAreNewVariants} // can upload images only when all variants are saved
              image={groupImage}
              onRemove={() => {
                removeVariantImage(variants.map(v => v.id));
              }}
              onUpload={file => {
                addVariantImage(
                  variants.map(v => v.id),
                  file
                );
              }}
            />

            <div className="flex flex-col gap-2 items-start">
              <p className="w-fit">{groupName}</p>
              <AccordionTrigger className="py-0">
                <p className="w-fit text-nowrap">{variants.length} variants</p>
              </AccordionTrigger>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <Input
              placeholder="$ 0.00"
              isPrice
              onChange={e => {
                const price = e.target.value;

                updateVariants(
                  AllVariants.map(v => {
                    if (variants.some(variant => variant.id === v.id)) {
                      return { ...v, price };
                    }

                    return v;
                  })
                );
              }}
            />
            <Input placeholder="0" disabled value={totalStock} />
          </div>
        </div>

        <AccordionContent className="flex flex-col border-t pb-0 divide-y">
          {variants.map(variant => (
            <VariantItem key={variant.id} variant={variant} groupName={groupName} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type Props = {
  variants: VariantContext['variants'];
  groupName: string;
};
