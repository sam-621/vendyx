import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch
} from '@ebloc/theme';

import { useConfigContext } from '@/app/config/contexts';
import { FormInput, FormTextarea } from '@/lib/components';
import { type CommonPaymentMethodFragment } from '@/lib/ebloc/codegen/graphql';

import { type PaymentMethodDetailsFormInput } from './use-payment-method-details-form';

export const PaymentMethodDetails: FC<Props> = ({ paymentMethod }) => {
  const config = useConfigContext();
  const { register, control, formState } = useFormContext<PaymentMethodDetailsFormInput>();
  const { errors } = formState;

  if (!config) return null;

  const { paymentHandlers } = config;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 items-end">
        <Controller
          control={control}
          name="handler"
          defaultValue={paymentHandlers[0].code}
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="payment-method-handler">Payment method handler</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="payment-method-handler">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentHandlers.map(handler => (
                    <SelectItem key={handler.code} value={handler.code}>
                      {handler.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="enabled"
          render={({ field }) => (
            <div className="flex items-center space-x-2 pb-[6px]">
              <Switch
                id="payment-method-status"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="payment-method-status" className="cursor-pointer text-base">
                Active
              </Label>
            </div>
          )}
        />
      </div>
      <FormInput
        {...register('name')}
        error={errors.name?.message}
        defaultValue={paymentMethod?.name}
        label="Name"
        placeholder="Credit Card"
      />
      <FormTextarea
        {...register('description')}
        defaultValue={paymentMethod?.description ?? ''}
        label="Description"
      />
    </div>
  );
};

type Props = {
  paymentMethod?: CommonPaymentMethodFragment;
};
