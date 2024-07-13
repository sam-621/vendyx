import { useEffect } from 'react';

import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';

export const useZoneDetailsForm = (zone?: CommonZoneFragment | null | undefined) => {
  const form = useForm<ZoneDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    form.reset({ name: zone?.name ?? '' });
  }, [zone]);

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
