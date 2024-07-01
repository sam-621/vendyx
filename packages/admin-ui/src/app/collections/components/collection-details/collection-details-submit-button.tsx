import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

import { type CollectionDetailsFormInput } from './use-collection-details-form';

export const CollectionDetailsSubmitButton: FC<Props> = ({ collection }) => {
  const form = useFormContext<CollectionDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !isFormDirty(collection, values as CollectionDetailsFormInput);

  return (
    <Button disabled={isDisabled} isLoading={form.formState.isSubmitting} type="submit">
      Save
    </Button>
  );
};

export const isFormDirty = (
  customer: CommonCollectionFragment,
  formInput: CollectionDetailsFormInput
) => {
  return Object.keys(formInput).some(key => {
    return ((customer as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  collection: CommonCollectionFragment;
};
