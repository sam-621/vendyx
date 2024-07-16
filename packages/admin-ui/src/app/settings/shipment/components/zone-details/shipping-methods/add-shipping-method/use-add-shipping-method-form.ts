import { useEffect, useState } from 'react';

import { useConfigContext } from '@/app/config/contexts';

export const useAddShippingMethodForm = () => {
  const [shippingMethod, setShippingMethod] = useState({
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
          (acc as any)[arg.key] = arg.defaultValue ?? '';
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

  return {
    priceCalculators: config?.priceCalculators ?? [],
    shippingMethod,
    selectedPcCode,
    setSelectedPcCode,
    setShippingMethod
  };
};
