import { useParams } from 'react-router-dom';

import {
  InventoryKeys,
  useAddOptionValues,
  useCreateVariant,
  useGetProductDetails,
  useRemoveOption,
  useRemoveVariant,
  useUpdateOption
} from '@/app/inventory/hooks';
import {
  getNewVariantsByNewOptionValues,
  getVariantsWithDuplicatedValues,
  getVariantsWithoutOption,
  removeVariantsWithDuplicatedOptionValues
} from '@/app/inventory/utils';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { OptionValueState, useManageOptionsStates } from '../use-manage-options';

export const useUpdateOptionForm = (
  option: CommonProductFragment['options'][0],
  onFinish: () => void
) => {
  const { slug } = useParams();
  const { product } = useGetProductDetails(slug ?? '');
  const { removeOption } = useRemoveOption();
  const { removeVariant } = useRemoveVariant();
  const { addOptionValues } = useAddOptionValues();
  const { createVariant } = useCreateVariant();
  const { updateOption } = useUpdateOption();

  const state = useManageOptionsStates([
    {
      id: option.id,
      name: option.name,
      values: [
        ...(option.values?.map(v => ({ id: v.id, value: v.value })) ?? []),
        new OptionValueState()
      ]
    }
  ]);

  /**
   * Remove the option and its values from the product
   *
   * 1. Remove the option
   * 2. Remove the duplicated variants (variants with the same option values)
   *    This is necessary because more than 1 variant cannot have the same option values
   *    This scenario can happen when for example we got [s/red, s/green, m/red, m/green]
   *    And we remove the option color (red, green), the result should be:
   *    [s, s, m, m] because we removed the option values red and green but the other values are still present
   *    So in this case we remove the duplicated variants
   */
  const onRemove = async () => {
    const variantsWithoutOption = getVariantsWithoutOption(option, product?.variants?.items ?? []);
    const duplicatedVariants = getVariantsWithDuplicatedValues(variantsWithoutOption);

    await removeOption(option.id);
    await Promise.all(duplicatedVariants.map(async v => await removeVariant(v.id)));
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(product?.slug ?? '') });

    onFinish();
    notification.success('Option removed successfully');
  };

  /**
   * Update option name and add/remove values
   *
   * 1. Add new values (if any) to the option
   *   - Create the new variants with the new option values
   * 2. Update the option name
   */
  const onUpdate = async () => {
    const newOption = state.options[0];

    const newOptionValues = newOption.values.filter(v => v.value);
    const oldOptionValues = option.values?.map(v => v.id) ?? [];

    const valuesToCreate = newOptionValues.filter(v => !oldOptionValues.includes(v.id));

    if (valuesToCreate.length) {
      const { values } = await addOptionValues(
        option.id,
        valuesToCreate.map(v => v.value)
      );
      const valuesCreated = values?.filter(v => !oldOptionValues.includes(v.id)) ?? [];
      const variantsWithOptionValues = product?.variants?.items.filter(v => v.optionValues?.length);
      const variantsFromOtherOptions = getVariantsWithoutOption(option, variantsWithOptionValues);

      const newVariants = getNewVariantsByNewOptionValues(
        removeVariantsWithDuplicatedOptionValues(variantsFromOtherOptions) ?? [],
        valuesCreated
      );

      await Promise.all(
        newVariants.map(async variant => {
          const { values } = variant;
          return await createVariant(product.id, {
            price: 0,
            published: true,
            sku: '',
            stock: 0,
            optionValuesIds: values
          });
        })
      );
    }

    await updateOption(option.id, { name: newOption.name });
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(product?.slug ?? '') });
    onFinish();
    notification.success('Option updated');
  };

  return {
    state,
    onUpdate,
    onRemove
  };
};
