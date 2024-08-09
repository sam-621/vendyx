import { useMemo, useState } from 'react';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import { generateVariants } from '@/lib/product/utils';

export const useOptionDetailsForm = (option: VariantContext['options'][0]) => {
  const { updateOption, removeOption, options, variants, updateVariants } = useVariantContext();
  const [name, setName] = useState(option.name);
  const [values, setValues] = useState<{ name: string; id: string }[]>(option.values);

  const isOptionNameRepeated = useMemo(
    () => getOptionNameIsRepeated(options, name, option),
    [name, options, option]
  );

  const valueRepeated = useMemo(() => getValueRepeated(values), [values]);

  const hasNoValues = useMemo(() => getHasNoValues(values), [values]);

  const onDone = () => {
    const newOptions = options.map(o => {
      if (o.id === option.id) {
        return {
          ...o,
          name,
          values: values.filter(v => v.name),
          isEditing: false
        };
      }

      return o;
    });

    // const optionsToCreate = [];
    // const optionsToUpdate = [];

    // for (const oldOption of options) {
    //   const curr = newOptions.find(newOption => newOption.id === oldOption.id);

    //   if (!curr) {
    //     optionsToCreate.push(curr);
    //     continue;
    //   }

    //   // send the option with the updated name and values
    //   // sending all values
    //   // if value has an id, it means it is an existing value and should be updated
    //   // if value has no id, it means it is a new value and should be created
    //   // and if a old values is not in the new values, it means it should be deleted
    //   optionsToUpdate.push(curr);
    // }

    // console.log({
    //   optionsToCreate,
    //   optionsToUpdate
    // });

    const generatedVariants = generateVariants(newOptions, variants);

    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name),
      isEditing: false
    });
    updateVariants(generatedVariants);
  };

  const onCancel = () => {
    if (!option.name) {
      removeOption(option.id);
      return;
    }

    updateOption(option.id, {
      ...option,
      values: option.values.filter(v => v.name),
      isEditing: false
    });
  };

  const onRemove = () => {
    const newOptions = options.filter(o => o.id !== option.id);

    const generatedVariants = generateVariants(newOptions, variants);

    removeOption(option.id);
    updateVariants(generatedVariants);
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
