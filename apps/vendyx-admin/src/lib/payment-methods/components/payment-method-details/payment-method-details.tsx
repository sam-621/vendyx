'use client';

import { type FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from '@radix-ui/react-dropdown-menu';

import { type CommonPaymentIntegrationFragment, type Metadata } from '@/lib/shared/api';
import {
  Input,
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

import { type PaymentMethodFormInput } from './use-payment-method-form';

export const PaymentMethodDetails: FC<Props> = ({ integrations }) => {
  const defaultIntegration = integrations[0];

  const { control, setValue, getValues } = useFormContext<PaymentMethodFormInput>();
  const [selectedIntegration, setSelectedIntegration] =
    useState<CommonPaymentIntegrationFragment>(defaultIntegration);

  const metadata = selectedIntegration.metadata as Metadata[];

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
                onValueChange={value => {
                  const integration = integrations.find(integration => integration.id === value);

                  if (integration) {
                    setSelectedIntegration(integration);
                  }

                  field.onChange(value);
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
          {metadata.map(({ key }) => (
            <div key={key} className="flex flex-col gap-2">
              <Label>{key}</Label>
              <Input
                onChange={e =>
                  setValue('metadata', { ...getValues('metadata'), [key]: e.target.value })
                }
                placeholder="*****"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type Props = {
  integrations: CommonPaymentIntegrationFragment[];
};
