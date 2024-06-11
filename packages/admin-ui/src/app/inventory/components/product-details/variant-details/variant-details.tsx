import { useState } from 'react';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { useProductDetailsContext } from '@/app/inventory/context';
import { t } from '@/lib/locales';

import { OptionsDetails } from './options-details/options-details';
import { VariantsListing } from './variants-listing';

export const VariantDetails = () => {
  const { product } = useProductDetailsContext();
  const [isAddingOptions, setIsAddingOptions] = useState(false);

  const variants = product?.variants;
  const defaultOptions = product?.options;

  const isProductAlreadyCreated = Boolean(product);
  const hasOptions = Boolean(defaultOptions?.length);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>{t('product-details.pricing.title')}</CardTitle>
        {!isAddingOptions && !hasOptions && isProductAlreadyCreated && (
          <Button
            className="text-distinct"
            variant="link"
            type="button"
            onClick={() => setIsAddingOptions(true)}
          >
            <PlusIcon size={16} />
            Add options
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <OptionsDetails options={product?.options} isAdding={isAddingOptions} />
        <VariantsListing variants={variants} />
      </CardContent>
    </Card>
  );
};
