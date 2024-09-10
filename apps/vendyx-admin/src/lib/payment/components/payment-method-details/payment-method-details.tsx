'use client';

import { type FC, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type CommonPaymentIntegrationFragment,
  type CommonPaymentMethodFragment,
  type Metadata
} from '@/api';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/lib/shared/components';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSwitch
} from '@/lib/shared/form';

import { RemovePaymentMethodButton } from '../remove-payment-method';
import { type PaymentMethodFormInput } from './use-payment-method-form';

export const PaymentMethodDetails: FC<Props> = ({ integrations, method }) => {
  const defaultIntegration = method
    ? integrations.find(i => i.name === method.name) ?? integrations[0]
    : integrations[0];

  const { control, setValue, getValues } = useFormContext<PaymentMethodFormInput>();
  const [selectedIntegration, setSelectedIntegration] =
    useState<CommonPaymentIntegrationFragment>(defaultIntegration);

  const metadata = useMemo(
    () =>
      (selectedIntegration.metadata as Metadata[]).map(metadata => ({
        ...metadata,
        id: Math.random().toString()
      })),
    [selectedIntegration]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4 w-full">
        <FormField
          control={control}
          name="integration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Provider</FormLabel>
              <Select
                disabled={Boolean(method)}
                onValueChange={value => {
                  const integration = integrations.find(integration => integration.id === value);

                  if (integration) {
                    setSelectedIntegration(integration);
                  }

                  field.onChange(value);
                  setValue('metadata', {});
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {integrations.map(integration => (
                    <SelectItem key={integration.id} value={integration.id}>
                      {integration.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-[6px]">
          <FormSwitch control={control} name="enabled" label="Active" />
        </div>
      </div>

      {selectedIntegration && (
        <div className="flex flex-col gap-4">
          {metadata.map(({ id, label, key }) => (
            <div key={id} className="flex flex-col gap-2">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                onChange={e =>
                  setValue('metadata', { ...getValues('metadata'), [key]: e.target.value })
                }
                defaultValue={method?.integrationMetadata[key] ?? ''}
                placeholder="*****"
              />
            </div>
          ))}
        </div>
      )}

      {method && (
        <div className="flex justify-end">
          <RemovePaymentMethodButton method={method} />
        </div>
      )}
    </div>
  );
};

type Props = {
  method?: CommonPaymentMethodFragment;
  integrations: CommonPaymentIntegrationFragment[];
};
