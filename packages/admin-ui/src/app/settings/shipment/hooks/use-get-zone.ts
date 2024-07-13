import { useFragment } from '@/lib/ebloc/codegen';
import { CommonZoneFragment, GetZoneQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { ShipmentKeys } from './shipment.keys';

export const useGetZone = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetZoneQuery,
    variables: { id },
    key: ShipmentKeys.single(id)
  });
  const zone = useFragment(CommonZoneFragment, data?.zone);

  return {
    zone,
    isLoading
  };
};
