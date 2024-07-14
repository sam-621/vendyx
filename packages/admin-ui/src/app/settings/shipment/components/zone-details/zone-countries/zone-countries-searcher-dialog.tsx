import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { useGetCountries } from '@/app/settings/country';
import { EntitySearchEmptyState, EntitySearcherDialog } from '@/lib/components';
import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { useSetCountriesToZone } from '../../../hooks';

export const ZoneCountriesSearcherDialog: FC<Props> = ({ zone }) => {
  const { countries } = useGetCountries();
  const { setCountriesToZone } = useSetCountriesToZone();

  const countriesInZone = zone.countries.items.map(c => c.id) ?? [];

  return (
    <EntitySearcherDialog
      title="Add countries"
      description="Update the countries in the zone"
      items={countries ?? []}
      defaultSelectedItems={countriesInZone}
      item={item => <p>{item.name}</p>}
      onDone={async selectedIds => {
        const { error } = await setCountriesToZone(zone.id, selectedIds);

        return { closeModal: !error };
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
