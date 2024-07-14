import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { ShipmentKeys, useSetCountriesToZone } from '../../../hooks';

export const useZoneCountriesForm = (zone: CommonZoneFragment) => {
  const countriesInZone = zone.countries.items.map(c => c.id) ?? [];
  const { setCountriesToZone } = useSetCountriesToZone();

  const onDone = async (selectedIds: string[]) => {
    if (JSON.stringify(countriesInZone) === JSON.stringify(selectedIds)) {
      return { success: true };
    }

    const { error } = await setCountriesToZone(zone.id, selectedIds);

    if (error) {
      notification.error(error);
      return { success: false };
    }

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.single(zone.id) });

    if (selectedIds.length === 0) {
      notification.success('All countries removed from zone');
    } else {
      notification.success(`Countries added to zone`);
    }

    return { success: true };
  };

  return {
    onDone
  };
};
