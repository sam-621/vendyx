'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { ZoneService } from '@/api/services';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const createZone = async (input: Input) => {
  const { name, statesIds } = input;

  const zoneCreated = await ZoneService.create({ name, stateIds: statesIds });

  const basePath = getBasePathFormHeaders(headers());

  redirect(`${basePath}/settings/shipments/${zoneCreated.id}`);
};

type Input = {
  name: string;
  statesIds: ID[];
};
