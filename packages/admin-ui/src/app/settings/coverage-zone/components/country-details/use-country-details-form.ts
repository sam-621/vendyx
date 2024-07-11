import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CountryKeys, useCreateCountry, useUpdateCountry } from '../../hooks';

export const useCountryDetailsForm = (country?: CommonCountryFragment) => {
  const navigate = useNavigate();
  const { updateCountry } = useUpdateCountry();
  const { createCountry } = useCreateCountry();

  const form = useForm<CountryDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: country?.name,
      enabled: country?.enabled ?? true
    }
  });

  useEffect(() => {
    form.reset({
      name: country?.name,
      enabled: country?.enabled ?? true
    });
  }, [country]);

  const onSubmit = async (input: CountryDetailsFormInput) => {
    const isUpdate = Boolean(country);

    if (isUpdate) {
      await onUpdate(input);
    } else {
      await onCreate(input);
    }
  };

  const onCreate = async (input: CountryDetailsFormInput) => {
    const { country, error } = await createCountry({ name: input.name });

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CountryKeys.all });

    navigate(`/settings/coverage-zones/${country?.id}`);
    notification.success('Country created successfully');
  };

  const onUpdate = async (input: CountryDetailsFormInput) => {
    if (!country) throw new Error('On update method should be called when country is defined');

    const { error } = await updateCountry(country?.id ?? '', input);

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CountryKeys.single(country?.id ?? '') });

    notification.success('Country updated successfully');
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.minChars(3)),
  enabled: z.boolean()
} satisfies MakeAny<CountryDetailsFormInput>);

export type CountryDetailsFormInput = {
  name: string;
  enabled: boolean;
};
