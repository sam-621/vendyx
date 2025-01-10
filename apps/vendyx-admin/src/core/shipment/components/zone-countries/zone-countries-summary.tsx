import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { CardDescription, CardTitle } from '@/shared/components/ui/card';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { add3dots } from '@/shared/utils/formatters';

import { type ShipmentContext } from '../../contexts/shipment-context';
import { isStateInCountry } from '../../utils/shipment.utils';
import { type ZoneDetailsFormInput } from '../zone-details/use-zone-details-form';

export const ZoneCountriesSummary = () => {
  const {
    entity: { countries }
  } = useEntityContext<ShipmentContext>();
  const { watch } = useFormContext<ZoneDetailsFormInput>();

  const states = watch('states');

  const [title, selectedCountries] = useMemo(() => {
    const selectedCountries = countries.filter(country => {
      return states.some(state => isStateInCountry(state, country));
    });

    const title = selectedCountries.map(country => country.name).join(', ');

    return [title, selectedCountries];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  const description = useMemo(() => {
    if (selectedCountries.length === 1) {
      return `${states.length} ${states.length === 1 ? 'State' : 'States'}`;
    }

    return `${selectedCountries.length} ${selectedCountries.length === 1 ? 'Country' : 'Countries'} with ${states.length} ${states.length === 1 ? 'State' : 'States'}`;
  }, [selectedCountries, states]);

  if (!states.length) {
    return <CardTitle>Countries</CardTitle>;
  }

  return (
    <div className="flex flex-col gap-3">
      <CardTitle>{add3dots(title, 20)}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </div>
  );
};
