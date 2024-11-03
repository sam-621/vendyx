import { type FC } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Input
} from '@/lib/shared/components';

import {
  useRemoveAssetVariant,
  useVariantAssetUploader,
  VariantAssetUploader
} from '../../variant-asset-uploader';
import { VariantItem } from '../variant-item';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  const { variants: AllVariants, updateVariants, product } = useVariantContext();
  const { addVariantImage, isLoading } = useVariantAssetUploader();
  const { removeVariantImage, isLoading: removeLoading } = useRemoveAssetVariant();

  const defaultGroupImage = variants.filter(v => v.image?.url).map(v => v.image?.url ?? '')[0];
  const groupNewImage = variants.find(v => v.image?.newImage);

  const groupImage = groupNewImage?.image?.newImage
    ? URL.createObjectURL(groupNewImage.image?.newImage)
    : defaultGroupImage ?? null;

  if (!variants.length) return null;

  const totalStock = variants.reduce((acc, variant) => acc + variant.stock, 0);

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
              image={groupImage}
              onRemove={() => {
                if (product) {
                  removeVariantImage(variants.map(v => v.id));
                } else {
                  // updateVariants(
                  //   AllVariants.map(v => {
                  //     if (variants.some(variant => variant.id === v.id)) {
                  //       return { ...v, image: groupNewImage ? undefined : { id: null } };
                  //     }
                  //     return v;
                  //   })
                  // );
                }
              }}
              onUpload={file => {
                if (product) {
                  addVariantImage(
                    variants.map(v => v.id),
                    file
                  );
                }

                // updateVariants(
                //   AllVariants.map(v => {
                //     if (variants.some(variant => variant.id === v.id)) {
                //       return { ...v, image: { newImage: file } };
                //     }

                //     return v;
                //   })
                // );
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
