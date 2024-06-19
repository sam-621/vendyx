import { type FC } from 'react';

import { Button } from '@ebloc/theme';
import { SaveIcon } from 'lucide-react';

import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { RemoveVariantButton } from './remove-variant-button';

export const VariantItem: FC<Props> = ({ variant }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1">
        {variant.optionValues?.map((optionValue, i) => (
          <>
            <span key={optionValue.id}>{optionValue.value}</span>
            {variant.optionValues?.length !== i + 1 && <span>/</span>}
          </>
        ))}
      </div>
      <div className="flex gap-2 items-end">
        <FormInput label="Price" placeholder="$ 0.00" />
        <FormInput label="SKU" placeholder="SKU - 000" />
        <FormInput label="Quantity" placeholder="0" />
        <Button variant="ghost" size="icon" className="p-2" type="button" onClick={() => {}}>
          <SaveIcon size={16} />
        </Button>
        <RemoveVariantButton variant={variant} />
      </div>
    </div>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
};
