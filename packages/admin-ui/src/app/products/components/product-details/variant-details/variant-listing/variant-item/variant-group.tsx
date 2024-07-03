import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ebloc/theme';

import { useVariantsContext } from '@/app/products/context';
import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { VariantItem } from './variant-item';

export const VariantGroup: FC<Props> = ({ optionValue, variants }) => {
  const { addVariantWithChanges, variantsWithChanges } = useVariantsContext();
  const totalStock = variants.reduce((acc, variant) => acc + variant.stock, 0);

  const handleNewPriceGroup = (price: number) => {
    addVariantWithChanges(
      variants.map(v => ({
        id: v.id,
        input: {
          price,
          sku: variantsWithChanges.find(vwc => vwc.id === v.id)?.input.sku,
          stock: variantsWithChanges.find(vwc => vwc.id === v.id)?.input.stock
        }
      }))
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full pt-3">
      <AccordionItem value="item-1">
        <div className="flex w-full justify-between items-center pb-4 overflow-x-scroll lg:overflow-auto gap-8">
          <div className="flex flex-col gap-2 items-start">
            <p className="w-fit pl-6">{optionValue}</p>
            <AccordionTrigger className="py-0">
              <p className="w-fit pl-6 text-nowrap">{variants.length} variants</p>
            </AccordionTrigger>
          </div>
          <div className="flex gap-2 items-end h-full pr-6 flex-shrink-0">
            <FormInput
              label="Price"
              placeholder="$ 0.00"
              onFocus={e => e.target.select()}
              onChange={e => handleNewPriceGroup(Number(e.target.value))}
            />
            <FormInput label="Total stock" placeholder="0" disabled value={totalStock} />
          </div>
        </div>

        <AccordionContent className="flex flex-col border-t pb-0">
          {variants.map(variant => (
            <VariantItem key={variant.id} variant={variant} inGroup />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type Props = {
  optionValue: string;
  variants: CommonProductFragment['variants']['items'];
};
