import { Card, CardHeader } from '@/shared/components/ui/card';

import { ZoneCountriesSelector } from './zone-countries-selector';
import { ZoneCountriesSummary } from './zone-countries-summary';

export const ZoneCountries = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center pb-6">
        <ZoneCountriesSummary />
        <ZoneCountriesSelector />
      </CardHeader>
    </Card>
  );
};
