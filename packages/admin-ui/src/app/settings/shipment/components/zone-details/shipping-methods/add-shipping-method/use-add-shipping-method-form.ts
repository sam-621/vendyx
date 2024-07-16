import { useEffect, useState } from 'react';

import { type THashMap } from '@ebloc/common';

import { type PriceCalculator, useConfigContext } from '@/app/config/contexts';
import { ShipmentKeys, useCreateShippingMethod } from '@/app/settings/shipment/hooks';
import { ArgType } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const useAddShippingMethodForm = (zoneId: string) => {
  const { createShippingMethod } = useCreateShippingMethod();
  const [shippingMethod, setShippingMethod] = useState<FormInput>({
    name: '',
    description: '',
    args: {}
  });
  const [selectedPcCode, setSelectedPcCode] = useState<string>('');
  const config = useConfigContext();

  useEffect(
    function setInitialData() {
      if (config) {
        const _selectedPcCode = selectedPcCode || config.priceCalculators[0].code;
        const selectedPc = config.priceCalculators.find(pc => pc.code === _selectedPcCode);

        setSelectedPcCode(_selectedPcCode);

        const pcArgs = selectedPc?.args.reduce((acc, arg) => {
          (acc as THashMap)[arg.key] = arg.defaultValue ?? '';
          return acc;
        }, {});

        setShippingMethod(prevState => ({
          ...prevState,
          args: pcArgs ?? {}
        }));
      }
    },
    [config?.priceCalculators, selectedPcCode]
  );

  const onSave = async () => {
    const { name, description, args } = shippingMethod;

    if (!name) {
      notification.error('Name is required');
      return;
    }

    const selectedPc = config?.priceCalculators.find(pc => pc.code === selectedPcCode);

    if (!selectedPc) {
      notification.error('Select a price calculator');
      return;
    }

    const { hasError } = applyConditionsToArgs(selectedPc.args);

    if (hasError) {
      return;
    }

    const argsInArray = Object.entries(args).map(([key, value]) => ({ key, value: String(value) }));

    await createShippingMethod(zoneId, {
      name,
      description,
      priceCalculator: {
        code: selectedPcCode,
        args: argsInArray
      }
    });

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.single(zoneId) });
    notification.success('Shipping method created');
  };

  const applyConditionsToArgs = (args: PriceCalculator['args']) => {
    let hasError = false;

    function error(msg: string) {
      notification.error(msg);
      hasError = true;
    }

    args.forEach(arg => {
      const argValue = shippingMethod.args[arg.key];

      if (arg.required && !argValue) {
        error(`${arg.label} is required`);
      }

      if (arg.conditions) {
        if (arg.type === ArgType.Text) {
          const { min, max } = arg.conditions;
          const value = String(argValue);

          if (value.length < min || value.length > max) {
            error(`${arg.label} must be between ${min} and ${max} characters`);
          }
        }

        if (arg.type === ArgType.Number) {
          const { min, max } = arg.conditions;
          const value = Number(argValue);

          if (value < min || value > max) {
            error(`${arg.label} must be between ${min} and ${max}`);
          }
        }

        if (arg.type === ArgType.Price) {
          const { min, max } = arg.conditions;
          const value = Number(argValue);

          if (value < min || value > max) {
            error(`${arg.label} must be between ${min} and ${max}`);
          }
        }
      }
    });

    return { hasError };
  };

  return {
    priceCalculators: config?.priceCalculators ?? [],
    shippingMethod,
    selectedPcCode,
    setSelectedPcCode,
    setShippingMethod,
    onSave
  };
};

type FormInput = {
  name: string;
  description: string;
  args: THashMap;
};
