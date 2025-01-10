import { getFragmentData } from '../codegen';
import { type CreateZoneInput, type UpdateZoneInput } from '../codegen/graphql';
import {
  COMMON_ZONE_FRAGMENT,
  CREATE_ZONE_MUTATION,
  GET_ALL_ZONES_QUERY,
  GET_ZONE_QUERY,
  REMOVE_ZONE_MUTATION,
  UPDATE_ZONE_MUTATION
} from '../operations/zone.operations';
import { type ID } from '../scalars/scalars.type';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ZoneService = {
  Tags: {
    zones: 'zones',
    zone: (id: ID) => `zone-${id}`
  },

  async getAll() {
    const { zones } = await serviceGqlFetcher(
      GET_ALL_ZONES_QUERY,
      {},
      { tags: [ZoneService.Tags.zones] }
    );

    return zones;
  },

  async getById(id: ID) {
    const result = await serviceGqlFetcher(
      GET_ZONE_QUERY,
      { id },
      { tags: [ZoneService.Tags.zone(id)] }
    );
    const zone = getFragmentData(COMMON_ZONE_FRAGMENT, result.zone);

    return zone;
  },

  async create(input: CreateZoneInput) {
    const { createZone } = await serviceGqlFetcher(CREATE_ZONE_MUTATION, { input });

    return createZone;
  },

  async update(id: string, input: UpdateZoneInput) {
    const { updateZone } = await serviceGqlFetcher(UPDATE_ZONE_MUTATION, { id, input });

    return updateZone;
  },

  async remove(id: ID) {
    const { removeZone } = await serviceGqlFetcher(REMOVE_ZONE_MUTATION, { id });

    return removeZone;
  }
};
