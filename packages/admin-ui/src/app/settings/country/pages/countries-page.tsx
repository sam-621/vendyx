import { SettingsPageLayout } from '@/lib/components';

import { CountriesTable } from '../components/countries-table/countries-table';
import { useGetCountries } from '../hooks';

export const CountriesPage = () => {
  const { countries } = useGetCountries();

  return (
    <SettingsPageLayout
      title="Countries"
      subtitle="Add the countries where your business offers products and services."
    >
      <CountriesTable countries={countries} />
    </SettingsPageLayout>
  );
};
