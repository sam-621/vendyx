import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Label,
  Separator
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { OptionDetailsProvider, useProductDetailsContext } from '@/app/inventory/context';
import { t } from '@/lib/locales';

import { OptionsDetails } from './options-details/options-details';
import { useManageOptionsStates } from './options-details/use-manage-options';
import { VariantsListing } from './variant-listing/variants-listing';

export const VariantDetails = () => {
  const { product } = useProductDetailsContext();
  const optionStateUtilities = useManageOptionsStates();

  const variants = product?.variants;
  const defaultOptions = product?.options;

  const isProductAlreadyCreated = Boolean(product);
  const hasOptions = Boolean(defaultOptions?.length);
  const totalStock = variants?.items.reduce((acc, variant) => acc + variant.stock, 0);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>{t('product-details.pricing.title')}</CardTitle>
        {!optionStateUtilities.options.length && !hasOptions && isProductAlreadyCreated && (
          <Button
            className="text-distinct"
            variant="link"
            type="button"
            onClick={optionStateUtilities.addOption}
          >
            <PlusIcon size={16} />
            Add options
          </Button>
        )}
      </CardHeader>
      <CardContent
        className={cn('flex flex-col px-0', {
          'gap-4': Boolean(product?.options.length) || Boolean(optionStateUtilities.options.length)
        })}
      >
        <OptionDetailsProvider value={optionStateUtilities}>
          <OptionsDetails options={defaultOptions} />
        </OptionDetailsProvider>

        {(Boolean(product?.options.length) || Boolean(optionStateUtilities.options.length)) && (
          <div className="flex flex-col gap-4">
            <Separator />
            <Label className="pl-6">Variants</Label>
            <Separator />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <VariantsListing variants={variants} />
        </div>
      </CardContent>
      <CardFooter
        className={cn('w-full flex justify-center', {
          'border-t pt-6': [0, 1].includes(product?.options.length ?? 0)
        })}
      >
        <p className="text-muted-foreground">Total inventory: {totalStock}</p>
      </CardFooter>
    </Card>
  );
};
