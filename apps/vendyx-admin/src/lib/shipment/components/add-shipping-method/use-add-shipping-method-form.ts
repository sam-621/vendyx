import { useState } from 'react';

export const useAddShippingMethodForm = () => {
  const [method, setMethod] = useState<FormInput>({
    name: '',
    description: '',
    enabled: true,
    args: {}
  });

  const setValue = (input: SetValueInput) => {
    setMethod(prev => {
      return {
        ...prev,
        [input.key]: input.value
      };
    });
  };

  const exec = () => {
    console.log(method);
  };

  return {
    method,
    setValue,
    createShippingMethod: exec
  };
};

type SetValueInput =
  | {
      key: 'name' | 'description';
      value: string;
    }
  | {
      key: 'enabled';
      value: boolean;
    }
  | {
      key: 'args';
      value: any;
    };

type FormInput = {
  name: string;
  description: string;
  enabled: boolean;
  args: Record<string, string>;
};
