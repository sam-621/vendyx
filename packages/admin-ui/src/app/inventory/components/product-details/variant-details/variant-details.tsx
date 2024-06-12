import { Button, Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { OptionDetailsProvider, useProductDetailsContext } from '@/app/inventory/context';
import { t } from '@/lib/locales';

import { OptionsDetails } from './options-details/options-details';
import { useManageOptionsStates } from './options-details/use-manage-options';
import { VariantsListing } from './variants-listing';

export const VariantDetails = () => {
  const { product } = useProductDetailsContext();
  const optionStateUtilities = useManageOptionsStates();

  const variants = product?.variants;
  const defaultOptions = product?.options;

  const isProductAlreadyCreated = Boolean(product);
  const hasOptions = Boolean(defaultOptions?.length);

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
      <CardContent className="flex flex-col gap-4">
        <OptionDetailsProvider value={optionStateUtilities}>
          <OptionsDetails options={defaultOptions} />
        </OptionDetailsProvider>
        <VariantsListing variants={variants} />
      </CardContent>
    </Card>
  );
};
