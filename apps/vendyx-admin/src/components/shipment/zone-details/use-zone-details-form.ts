import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/form';

export const useZoneDetailsForm = () => {
  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(values: ZoneDetailsFormInput) {
    console.log(values);
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.min(1)),
  countries: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  )
});

export type ZoneDetailsFormInput = z.infer<typeof schema>;
