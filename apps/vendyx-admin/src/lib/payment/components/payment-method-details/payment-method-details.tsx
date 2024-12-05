'use client';

import { type FC, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type Args } from '@/api/scalars';
import { type CommonPaymentHandlerFragment, type CommonPaymentMethodFragment } from '@/api/types';
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

export const PaymentMethodDetails: FC<Props> = ({ handlers, method }) => {
  const defaultHandler = method
    ? handlers.find(i => i.name === method.name) ?? handlers[0]
    : handlers[0];

  const { control, setValue, getValues } = useFormContext<PaymentMethodFormInput>();
  const [selectedHandler, setSelectedHandler] =
    useState<CommonPaymentHandlerFragment>(defaultHandler);

  const args: Args = useMemo(() => selectedHandler.args, [selectedHandler]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4 w-full">
        <FormField
          control={control}
          name="handlerCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Provider</FormLabel>
              <Select
                disabled={Boolean(method)}
                onValueChange={value => {
                  const integration = handlers.find(handler => handler.code === value);

                  if (integration) {
                    setSelectedHandler(integration);
                  }

                  field.onChange(value);
                  setValue('args', {});
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {handlers.map(handler => (
                    <SelectItem key={handler.code} value={handler.code}>
                      {handler.name}
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
      {Object.entries(args).map(([key, arg]) =>
        arg.type === 'text' ? (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={key}>{arg.label}</Label>
            <Input
              id={key}
              onChange={e => setValue('args', { ...getValues('args'), [key]: e.target.value })}
              defaultValue={method?.args[key] ?? ''}
              placeholder={arg.placeholder}
            />
          </div>
        ) : null
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
  handlers: CommonPaymentHandlerFragment[];
};
