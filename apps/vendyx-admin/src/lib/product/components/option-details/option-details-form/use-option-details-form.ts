import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useVariantContext, type VariantContext } from '@/lib/product/contexts';
import { generateVariants } from '@/lib/product/utils';

import { type ProductDetailsFormInput } from '../../product-details/use-product-details-form';

export const useOptionDetailsForm = (option: VariantContext['options'][0]) => {
  const { setValue } = useFormContext<ProductDetailsFormInput>();
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
    const uuidExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidExp.test(option.id)) {
      // Complete new option has been created
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

      const generatedVariants = generateVariants(newOptions, variants);

      console.log({
        generatedVariants
      });

      updateOption(option.id, {
        ...option,
        name,
        values: values.filter(v => v.name),
        isEditing: false
      });
      updateVariants(generatedVariants);

      setValue('options', newOptions);

      setValue(
        'variants',
        generatedVariants.map(v => ({
          id: v.id,
          stock: v.stock,
          salePrice: v.price,
          optionValues: v.values
        }))
      );

      return;
    }

    // updating
    const _values = values.filter(v => v.name);

    const newValues = _values.filter(v => v.name && !uuidExp.test(v.id));
    const removedValues = option.values.filter(v => !_values.some(_v => _v.id === v.id));

    let newVariants = variants;
    let newOptions = options;

    if (newValues.length || removedValues.length) {
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

      newVariants = generateVariants(newOptions, variants);
    }

    updateOption(option.id, {
      ...option,
      name,
      values: values.filter(v => v.name),
      isEditing: false
    });
    updateVariants(newVariants);

    setValue('options', newOptions);

    setValue(
      'variants',
      newVariants.map(v => ({
        id: v.id,
        stock: v.stock,
        salePrice: v.price,
        optionValues: v.values
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
    console.log({
      generatedVariants
    });

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
