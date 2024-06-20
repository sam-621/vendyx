import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { VariantItem } from './variant-item';

export const VariantGroup: FC<Props> = ({ optionValue, variants }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div className="flex w-full justify-between items-center pb-4">
          <div className="flex flex-col gap-2">
            <p className="w-fit">{optionValue}</p>
            <AccordionTrigger className="py-0">
              <p className="w-fit">{variants.length} variants</p>
            </AccordionTrigger>
          </div>
          <div className="flex gap-2 flex-col items-center h-full">
            <FormInput containerClassName="w-fit" label="Total stock" placeholder="0" disabled />
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
