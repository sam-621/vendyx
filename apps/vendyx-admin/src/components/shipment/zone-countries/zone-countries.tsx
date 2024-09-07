import { Card, CardHeader, CardTitle } from '@/components/shared';

import { ZoneCountriesSelector } from './zone-countries-selector';

export const ZoneCountries = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center pb-6">
        <CardTitle>Countries</CardTitle>
        <ZoneCountriesSelector />
      </CardHeader>
    </Card>
  );
};
