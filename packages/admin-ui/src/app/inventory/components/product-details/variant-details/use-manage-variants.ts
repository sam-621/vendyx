import { useState } from 'react';

/**
 * Hook to manage the variants options states
 */
export const useManageVariants = () => {
  const [options, setOptions] = useState<OptionState[]>([]);

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const addOption = () => {
    setOptions([...options, new OptionState()]);
  };

  const updateOption = (id: string, name: string) => {
    setOptions(
      options.map(option => {
        if (option.id === id) {
          return { ...option, name };
        }
        return option;
      })
    );
  };

  const updateValues = (optionId: string, newOptionValues: OptionValueState[]) => {
    setOptions(
      options.map(option => {
        if (option.id === optionId) {
          return {
            ...option,
            values: newOptionValues
          };
        }

        return option;
      })
    );
  };

  // const addValue = (optionId: string) => {
  //   setOptions(
  //     options.map(option => {
  //       if (option.id === optionId) {
  //         return {
  //           ...option,
  //           values: [...option.values, new OptionsValueState()]
  //         };
  //       }
  //       return option;
  //     })
  //   );
  // };

  // const updateValue = (optionId: string, valueId: string, content: string) => {
  //   setOptions(
  //     options.map(option => {
  //       if (option.id === optionId) {
  //         return {
  //           ...option,
  //           values: option.values.map(v => (v.id === valueId ? { ...v, value: content } : v))
  //         };
  //       }
  //       return option;
  //     })
  //   );
  // };

  // const removeLastValue = (optionId: string) => {
  //   setOptions(
  //     options.map(option => {
  //       if (option.id === optionId) {
  //         return {
  //           ...option,
  //           values: option.values.slice(0, option.values.length - 1)
  //         };
  //       }
  //       return option;
  //     })
  //   );
  // };

  return {
    options,
    addOption,
    removeOption,
    updateOption,
    updateValues
  };
};

export class OptionState {
  constructor(
    readonly id: string = generateId(),
    readonly name: string = '',
    readonly values: OptionValueState[] = [new OptionValueState()]
  ) {}
}

export class OptionValueState {
  constructor(
    readonly id: string = generateId(),
    readonly value: string = ''
  ) {}
}

const generateId = () => {
  return crypto.randomUUID();
};
