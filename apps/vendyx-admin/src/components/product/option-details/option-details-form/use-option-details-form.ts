import { useMemo, useState } from 'react';

import { isUUID } from '@/lib/utils';

import { generateVariants, useVariantContext, type VariantContext } from '../../variant-details';

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
    // An complete new option
    if (!isUUID(option.id)) {
      onNewOption();
      return;
    }

    // An option already created being updated

    // get values without empty ones
    const _values = values.filter(v => v.name);

    // new values are the values with a math random id
    const newValues = _values.filter(v => v.name && !isUUID(v.id));
    // remove values are the old values (in db) that are not in the new values
    const removedValues = option.values
      .filter(v => v.name)
      .filter(v => !_values.some(_v => _v.id === v.id));

    let newVariants = variants;
    let newOptions = options;

    // If the values length has changed, we need to update the re generate the variants
    if (newValues.length || removedValues.length) {
      // add the current option to the options already in state
      newOptions = options.map(o => {
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

      // generate variants with the latest options and the varianst already in db (to determine which ones to create and update)
      newVariants = generateVariants(newOptions, variants);
    }

    // wheter the variants have been regenerated or not,
    // update the state in VariantsContext adding the new option and variants
    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name),
      isEditing: false
    });
    updateVariants(
      newVariants.map(v => ({
        ...v,
        values: v.values.map(ov => {
          const currentValue = _values.find(_v => _v.id === ov.id);

          if (currentValue) {
            return currentValue;
          }

          return ov;
        })
      }))
    );
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

  const onNewOption = () => {
    // Add the current option to the options already in state
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

    // Generate the new variants with this new option
    const generatedVariants = generateVariants(newOptions, variants);

    // Update the state in VariantsContext adding the new option and variants
    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name),
      isEditing: false
    });
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
