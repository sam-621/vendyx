import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { ShipmentKeys, useCreateZone, useUpdateZone } from '../../hooks';

export const useZoneDetailsForm = (zone?: CommonZoneFragment | null | undefined) => {
  const navigate = useNavigate();
  const { createZone } = useCreateZone();
  const { updateZone } = useUpdateZone();

  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    form.reset({ name: zone?.name ?? '' });
  }, [zone]);

  const onSubmit = async (input: ZoneDetailsFormInput) => {
    if (zone) {
      await onUpdate(input);
    } else {
      await onCreate(input);
    }
  };

  const onCreate = async (input: ZoneDetailsFormInput) => {
    const { error, zone } = await createZone({ name: input.name });

    if (error) {
      notification.error(error);
    }

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.all });
    notification.success('Zone created successfully');
    navigate(`/settings/shipments/${zone?.id}`);
  };

  const onUpdate = async (input: ZoneDetailsFormInput) => {
    if (!zone) {
      throw new Error('You should use onUpdate only when a zone is present');
    }

    const { error } = await updateZone(zone.id, { name: input.name });

    if (error) {
      notification.error(error);
    }

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.single(zone.id) });
    notification.success('Zone updated successfully');
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.minChars(3))
} satisfies MakeAny<ZoneDetailsFormInput>);

export type ZoneDetailsFormInput = {
  name: string;
};
