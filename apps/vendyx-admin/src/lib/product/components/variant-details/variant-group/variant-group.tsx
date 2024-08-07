import { type FC } from 'react';

import { UploadIcon } from 'lucide-react';

import { type VariantContext } from '@/lib/product/contexts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Input
} from '@/lib/shared/components';

import { VariantItem } from '../variant-item';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  return (
    <Accordion type="single" collapsible className="w-full pt-3">
      <AccordionItem value="item-1">
        <div className="flex items-center pb-4 px-6">
          <div className="w-full flex items-center gap-4">
            <Checkbox />
            {/* <div className="w-[60px] h-[60px] rounded-md border border-dashed flex items-center justify-center">
              <UploadIcon size={16} />
            </div> */}
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
            <VariantItem key={variant.id} variant={variant} inGroup />
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
