import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput, FormTextarea } from '@/lib/components';

export const CollectionGeneralInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <FormInput label="Name" placeholder="Electronics" />
          <FormInput label="Slug" placeholder="electronics" />
        </div>
        <FormTextarea label="Description" />
      </CardContent>
    </Card>
  );
};
