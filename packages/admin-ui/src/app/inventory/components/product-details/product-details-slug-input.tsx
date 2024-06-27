import { type FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { getParsedSlug } from '@ebloc/common';

import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetailsSlugInput: FC<Props> = ({ product }) => {
  const { register, setValue } = useFormContext<ProductDetailsFormInput>();

  const name = useWatch({
    name: 'name',
    defaultValue: getParsedSlug(product?.name ?? '')
  }) as string;

  const parsedSlug = getParsedSlug(name);

  useEffect(() => {
    setValue('slug', parsedSlug);
  }, [parsedSlug]);

  return (
    <FormInput
      {...register('slug')}
      value={parsedSlug ?? product?.slug}
      label={t('product-details.general.input.slug')}
      placeholder="black-t-shirt"
      disabled
    />
  );
};

type Props = {
  product: CommonProductFragment | null | undefined;
};
