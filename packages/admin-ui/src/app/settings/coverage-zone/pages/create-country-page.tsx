import { FormProvider } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { SettingsPageLayout } from '@/lib/components';

import { CountryDetails } from '../components/country-details/country-details';
import { useCountryDetailsForm } from '../components/country-details/use-country-details-form';

export const CreateCountryPage = () => {
  const form = useCountryDetailsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Create country"
          subtitle="Create a new country and start adding states to it"
          backUrl="/settings/coverage-zones"
          actions={<Button>Save</Button>}
        >
          <CountryDetails />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
