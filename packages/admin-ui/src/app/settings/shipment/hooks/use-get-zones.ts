import { GetZonesQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { ShipmentKeys } from './shipment.keys';

export const UseGetZones = () => {
  const { data, isLoading } = useGqlQuery({ document: GetZonesQuery, key: ShipmentKeys.all });

  return {
    zones: data?.zones?.items,
    isLoading
  };
};
