import { getFragmentData } from '../codegen';
import { type CreateZoneInput } from '../codegen/graphql';
import {
  COMMON_ZONE_FRAGMENT,
  CREATE_ZONE_MUTATION,
  GET_ALL_ZONES_QUERY,
  GET_ZONE_QUERY,
  REMOVE_ZONE_MUTATION,
  UPDATE_ZONE_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

export const ZoneService = {
  Tags: {
    zones: 'zones',
    zone: (id: string) => `zone-${id}`
  },

  async getAll() {
    const { zones } = await fetcher(GET_ALL_ZONES_QUERY, {}, { tags: [ZoneService.Tags.zones] });

    return zones;
  },

  async getById(id: string) {
    const result = await fetcher(GET_ZONE_QUERY, { id }, { tags: [ZoneService.Tags.zone(id)] });
    const zone = getFragmentData(COMMON_ZONE_FRAGMENT, result.zone);

    return zone;
  },

  async create(input: CreateZoneInput) {
    const { createZone } = await fetcher(CREATE_ZONE_MUTATION, { input });

    return createZone;
  },

  async update(id: string, input: CreateZoneInput) {
    const { updateZone } = await fetcher(UPDATE_ZONE_MUTATION, { id, input });

    return updateZone;
  },

  async remove(id: string) {
    const { removeZone } = await fetcher(REMOVE_ZONE_MUTATION, { id });

    return removeZone;
  }
};
