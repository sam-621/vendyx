import { type FC } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@ebloc/theme';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { add3dots } from '@/lib/utils';

import { ZoneCountriesSearcherDialog } from './zone-countries-searcher-dialog';

export const ZoneCountries: FC<Props> = ({ zone }) => {
  const countries = zone.countries.items;
  const countryName = countries.map(c => c.name).join(', ');

  if (countries.length === 0) {
    return (
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>Countries</CardTitle>
          <ZoneCountriesSearcherDialog zone={zone} />
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-start">
        <div className="flex flex-col gap-3">
          <CardTitle>{add3dots(countryName, 20)}</CardTitle>
          <CardDescription>{`${countries.length} ${countries.length === 1 ? 'Country' : 'Countries'}`}</CardDescription>
        </div>
        <ZoneCountriesSearcherDialog zone={zone} />
      </CardHeader>
    </Card>
  );
};

type Props = {
  zone: CommonZoneFragment;
};
