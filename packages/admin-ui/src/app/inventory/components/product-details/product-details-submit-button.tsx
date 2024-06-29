import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { useVariantsContext } from '../../context';
import { isProductDetailsFormDirty } from '../../utils';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetailsSubmitButton: FC<Props> = ({ product }) => {
  const { variantsWithChanges } = useVariantsContext();
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled =
    !isProductDetailsFormDirty(product, values as ProductDetailsFormInput) &&
    !variantsWithChanges.length;

  return (
    <Button disabled={isDisabled} isLoading={form.formState.isSubmitting} type="submit">
      {t('product-details.action.save')}
    </Button>
  );
};

type Props = {
  product: CommonProductFragment;
};
