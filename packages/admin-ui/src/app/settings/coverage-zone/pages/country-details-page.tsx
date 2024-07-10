import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@ebloc/theme';

import { SettingsPageLayout } from '@/lib/components';
import { formatDate } from '@/lib/utils';

import { CountryDetails } from '../components/country-details/country-details';
import { useCountryDetailsForm } from '../components/country-details/use-country-details-form';
import { useGetCountryDetails } from '../hooks';

export const CountryDetailsPage = () => {
  const { id } = useParams();
  const { country } = useGetCountryDetails(id ?? '');

  const form = useCountryDetailsForm(country ?? undefined);

  if (!country) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={country?.name}
          subtitle={formatDate(new Date(country.createdAt as string))}
          backUrl="/settings/coverage-zones"
          actions={<Button>Save</Button>}
        >
          <CountryDetails country={country} />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
