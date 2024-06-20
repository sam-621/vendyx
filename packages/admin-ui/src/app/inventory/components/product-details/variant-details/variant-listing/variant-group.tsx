import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { VariantItem } from './variant-item';

export const VariantGroup: FC<Props> = ({ optionValue, variants }) => {
  const totalStock = variants.reduce((acc, variant) => acc + variant.stock, 0);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div className="flex w-full justify-between items-center pb-4">
          <div className="flex flex-col gap-2">
            <p className="w-fit pl-6">{optionValue}</p>
            <AccordionTrigger className="py-0">
              <p className="w-fit pl-6">{variants.length} variants</p>
            </AccordionTrigger>
          </div>
          <div className="flex gap-2 flex-col items-center h-full pr-6">
            <FormInput
              containerClassName="w-fit"
              label="Total stock"
              placeholder="0"
              disabled
              value={totalStock}
            />
          </div>
        </div>

        <AccordionContent className="flex flex-col gap-4 pt-4 border-t">
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
