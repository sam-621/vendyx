import { Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';

import { OptionsListing } from '../option-details';

export const VariantDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent>
        <OptionsListing />
      </CardContent>
    </Card>
  );
};
