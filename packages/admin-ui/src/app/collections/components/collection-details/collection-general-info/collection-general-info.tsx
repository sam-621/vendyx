import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput, FormTextarea } from '@/lib/components';

import { type CollectionDetailsFormInput } from '../use-collection-details-form';

export const CollectionGeneralInfo = () => {
  const { register, formState } = useFormContext<CollectionDetailsFormInput>();
  const { errors } = formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <FormInput
            {...register('name')}
            error={errors.name?.message}
            label="Name"
            placeholder="Electronics"
          />
          <FormInput
            {...register('slug')}
            error={errors.slug?.message}
            label="Slug"
            placeholder="electronics"
          />
        </div>
        <FormTextarea {...register('description')} label="Description" />
      </CardContent>
    </Card>
  );
};
