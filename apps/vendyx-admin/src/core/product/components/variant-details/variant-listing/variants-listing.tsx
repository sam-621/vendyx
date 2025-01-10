import { useVariantContext } from '@/core/product/contexts/variant.context';
import { getVariantsGroupedByOption } from '@/core/product/utils/variant.utils';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';

import { VariantGroup } from '../variant-group/variant-group';
import { VariantItem } from '../variant-item/variant-item';

export const VariantsListing = () => {
  const { variants, options, updateVariants, removeVariants } = useVariantContext();

  const groupBy = options[0];
  const variantsGrouped = getVariantsGroupedByOption(groupBy, variants);
  const optionsSaved = options.filter(option => option.values.filter(v => v.name).length);
  const selectedVariantIds = variants.filter(v => v.selected).map(v => v.id);

  if (!variants.length) return null;

  return (
    <div>
      <header className="h-12 px-6 flex items-center border-y">
        <div className="flex items-center gap-2 w-full">
          <Checkbox
            id="variants"
            checked={variants.every(v => v.selected)}
            onCheckedChange={checked =>
              updateVariants(variants.map(v => ({ ...v, selected: Boolean(checked) })))
            }
          />
          <Label htmlFor="variants">Variants</Label>
        </div>

        {selectedVariantIds.length ? (
          <div className="flex justify-end items-center w-full">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeVariants(selectedVariantIds)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex items-center w-full">
            <Label className="w-full">Price</Label>
            <Label className="w-full">Stock</Label>
          </div>
        )}
      </header>
      {optionsSaved.length === 1 ? (
        <div className="flex flex-col divide-y">
          {variants.map(variant => (
            <VariantItem key={variant.id} variant={variant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col divide-y">
          {Object.entries(variantsGrouped).map(([key, variants]) => (
            <VariantGroup key={key} groupName={key} variants={variants} />
          ))}
        </div>
      )}
    </div>
  );
};
