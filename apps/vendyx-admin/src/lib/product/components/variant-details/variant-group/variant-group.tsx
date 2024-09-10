import { type FC } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Input
} from '@/lib/shared/components';

import { useVariantContext, type VariantContext } from '../variant.context';
import { VariantItem } from '../variant-item';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  const { variants: AllVariants, updateVariants } = useVariantContext();

  if (!variants.length) return null;

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
            <div className="flex flex-col gap-2 items-start">
              <p className="w-fit">{groupName}</p>
              <AccordionTrigger className="py-0">
                <p className="w-fit text-nowrap">{variants.length} variants</p>
              </AccordionTrigger>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <Input placeholder="$ 0.00" onFocus={e => e.target.select()} />
            <Input placeholder="0" disabled />
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
