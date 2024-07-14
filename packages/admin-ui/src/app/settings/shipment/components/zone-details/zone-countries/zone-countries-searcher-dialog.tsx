import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { useGetCountries } from '@/app/settings/country';
import { EntitySearchEmptyState, EntitySearcherDialog } from '@/lib/components';
import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { useZoneCountriesForm } from './use-zone-countries-form';

export const ZoneCountriesSearcherDialog: FC<Props> = ({ zone }) => {
  const { onDone } = useZoneCountriesForm(zone);

  const { countries } = useGetCountries();

  const countriesInZone = zone.countries.items.map(c => c.id) ?? [];

  return (
    <EntitySearcherDialog
      title="Add countries"
      description="Update the countries in the zone"
      items={countries ?? []}
      defaultSelectedItems={countriesInZone}
      item={item => <p>{item.name}</p>}
      onDone={async selectedIds => {
        const { success } = await onDone(selectedIds);

        return { closeModal: success };
      }}
      emptyState={
        <EntitySearchEmptyState
          title="You have no countries"
          description="You can add countries by clicking the button below"
          action={
            <Link to="/countries/new">
              <Button className="mt-4">Add country</Button>
            </Link>
          }
        />
      }
      trigger={
        <Button className="text-distinct" variant="link" type="button">
          <PlusIcon size={16} />
          Add countries
        </Button>
      }
    />
  );
};

type Props = {
  zone: CommonZoneFragment;
};
