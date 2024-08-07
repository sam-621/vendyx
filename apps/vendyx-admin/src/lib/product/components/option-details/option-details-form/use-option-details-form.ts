import { useMemo, useState } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';

export const useOptionDetailsForm = (option: VariantContext['options'][0]) => {
  const { updateOption, removeOption, options } = useVariantContext();
  const [name, setName] = useState(option.name);
  const [values, setValues] = useState<{ name: string; id: string }[]>(
    option.values.map(v => ({ name: v, id: Math.random().toString() }))
  );

  const isOptionNameRepeated = useMemo(
    () => getOptionNameIsRepeated(options, name, option),
    [name, options, option]
  );

  const valueRepeated = useMemo(() => getValueRepeated(values), [values]);

  const hasNoValues = useMemo(() => getHasNoValues(values), [values]);

  const onDone = () => {
    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name).map(v => v.name),
      isEditing: false
    });
  };

  const onCancel = () => {
    if (!option.name) {
      removeOption(option.id);
      return;
    }

    updateOption(option.id, { ...option, isEditing: false });
  };

  const onRemove = () => {
    removeOption(option.id);
  };

  return {
    name,
    setName,
    values,
    setValues,
    isOptionNameRepeated,
    valueRepeated,
    hasNoValues,
    onDone,
    onCancel,
    onRemove
  };
};

const getValueRepeated = (values: { name: string; id: string }[]) =>
  values
    // Remove empty values
    .filter(v => v.name)
    // get repeated values [original, repeated]
    .filter((currentValue, i) => {
      return values.some((value, j) => {
        const isNotTheSameIndex = i !== j;
        const isTheSameName = value.name.toLowerCase() === currentValue.name.toLowerCase();

        return isNotTheSameIndex && isTheSameName;
      });
    })
    // get the second repeated value (always the first will be the original)
    .find((_, i) => i !== 0);

const getHasNoValues = (values: { name: string; id: string }[]) =>
  values.filter(v => v.name).length === 0;

const getOptionNameIsRepeated = (
  options: VariantContext['options'],
  name: string,
  option: VariantContext['options'][0]
) =>
  // Check if there is an option with the same name and different id (different option than the current one)
  options.some(op => name && op.name === name && op.id !== option.id);
