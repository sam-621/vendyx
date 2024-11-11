import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';
import { FormInput, FormTextarea } from '@/lib/shared/form';

import { type CollectionDetailsFormInput } from '../collection-details';

export const CollectionGeneralInfoCard = () => {
  const { control } = useFormContext<CollectionDetailsFormInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <FormInput control={control} name="name" label="Name" placeholder="Electronics" />
        </div>
        <FormTextarea control={control} name="description" label="Description" />
      </CardContent>
    </Card>
  );
};
