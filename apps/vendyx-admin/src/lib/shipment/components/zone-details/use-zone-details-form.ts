import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

import { createZone } from '../../actions/create-zone';

export const useZoneDetailsForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      states: []
    }
  });

  async function onSubmit(values: ZoneDetailsFormInput) {
    startTransition(async () => {
      await createZone({ name: values.name, statesIds: values.states.map(state => state.id) });
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
