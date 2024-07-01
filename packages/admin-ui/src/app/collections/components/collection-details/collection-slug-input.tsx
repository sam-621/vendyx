import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { getParsedSlug } from '@ebloc/common';

import { FormInput } from '@/lib/components';

import { type CollectionDetailsFormInput } from './use-collection-details-form';

export const CollectionSlugInput = () => {
  const { register, formState, setValue } = useFormContext<CollectionDetailsFormInput>();
  const { errors, defaultValues } = formState;

  const value = useWatch({ name: 'name', defaultValue: defaultValues?.slug }) as string;

  useEffect(() => {
    setValue('slug', getParsedSlug(value ?? ''));
  }, [value]);

  return (
    <FormInput
      {...register('slug')}
      disabled
      error={errors.slug?.message}
      label="Slug"
      placeholder="electronics"
    />
  );
};
