import { type FC, useEffect, useState } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Dropzone,
  Input
} from '@/lib/shared/components';

import { VariantImage } from '../variant-image';
import { VariantItem } from '../variant-item';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  const { variants: AllVariants, updateVariants } = useVariantContext();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    updateVariants(
      AllVariants.map(v => {
        if (variants.some(variant => variant.id === v.id)) {
          return { ...v, image: file ?? undefined };
        }

        return v;
      })
    );
  }, [file]);

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
            {file ? (
              <VariantImage
                image={URL.createObjectURL(file)}
                size="md"
                onRemove={() => {
                  setFile(null);
                }}
              />
            ) : (
              <Dropzone
                size={'md'}
                onAcceptFiles={files => {
                  setFile(files[0]);
                }}
              />
            )}
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
