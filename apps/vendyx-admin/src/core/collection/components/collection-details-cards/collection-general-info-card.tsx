import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormInput } from '@/shared/form/form-input';
import { FormTextarea } from '@/shared/form/form-textarea';

import { type CollectionDetailsFormInput } from '../collection-details/use-collection-details-form';

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
