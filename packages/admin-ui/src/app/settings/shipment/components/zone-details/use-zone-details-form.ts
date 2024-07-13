import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages, useForm } from '@/lib/form';

export const useZoneDetailsForm = () => {
  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: ZoneDetailsFormInput) => {
    console.log(input);
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
