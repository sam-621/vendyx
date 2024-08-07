import { Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';

import { OptionsListing } from '../option-details';
import { VariantsListing } from './variants-listing';

export const VariantDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <div className="px-6 pb-4">
          <OptionsListing />
        </div>
        <VariantsListing />
      </CardContent>
    </Card>
  );
};
