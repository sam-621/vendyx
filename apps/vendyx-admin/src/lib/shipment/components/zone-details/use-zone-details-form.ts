import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonZoneFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { createZone } from '../../actions/create-zone';
import { updateZone } from '../../actions/update-zone';

export const useZoneDetailsForm = (zone?: CommonZoneFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: zone?.name ?? '',
      states: zone?.states ?? []
    }
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Zone updated');
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(values: ZoneDetailsFormInput) {
    startTransition(async () => {
      if (zone) {
        await updateZone(zone?.id, {
          name: values.name,
          stateIds: values.states.map(state => state.id)
        });

        setIsSuccess(true);
      } else {
        await createZone({ name: values.name, statesIds: values.states.map(state => state.id) });
      }
    });
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.min(1)),
  states: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  )
});

export type ZoneDetailsFormInput = z.infer<typeof schema>;
