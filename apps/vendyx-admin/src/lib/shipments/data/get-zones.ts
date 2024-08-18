import { ZoneService } from '@/lib/shared/api';

export const getZones = async () => {
  return await ZoneService.getAll();
};
