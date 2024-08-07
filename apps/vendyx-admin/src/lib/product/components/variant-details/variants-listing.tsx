import { Checkbox, Label } from '@/lib/shared/components';

import { useVariantContext } from '../../contexts';
import { getVariantsGroupedByOption } from '../../utils';
import { VariantGroup } from './variant-group';
import { VariantItem } from './variant-item';

export const VariantsListing = () => {
  const { variants, options } = useVariantContext();

  const groupBy = options[0];
  const variantsGrouped = getVariantsGroupedByOption(groupBy, variants);

  const optionsSaved = options.filter(option => option.values.filter(v => v.name).length);

  if (!variants.length) return null;

  return (
    <div>
      <header className="h-12 px-6 flex items-center border-y">
        <div className="flex items-center gap-2 w-full">
          <Checkbox id="variants" />
          <Label htmlFor="variants">Variants</Label>
        </div>
        <div className="flex items-center w-full">
          <Label className="w-full">Price</Label>
          <Label className="w-full">Stock</Label>
        </div>
      </header>
      {optionsSaved.length === 1 ? (
        <div className="flex flex-col divide-y">
          {variants.map(variant => (
            <VariantItem key={variant.id} variant={variant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {Object.entries(variantsGrouped).map(([key, variants]) => (
            <VariantGroup key={key} groupName={key} variants={variants} />
          ))}
        </div>
      )}
    </div>
  );
};
