import { type FC } from 'react';

import { Card, CardHeader, CardTitle } from '@ebloc/theme';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { ZoneCountriesSearcherDialog } from './zone-countries-searcher-dialog';

export const ZoneCountries: FC<Props> = ({ zone }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Countries</CardTitle>
        <ZoneCountriesSearcherDialog zone={zone} />
      </CardHeader>
    </Card>
  );
};

type Props = {
  zone: CommonZoneFragment;
};
