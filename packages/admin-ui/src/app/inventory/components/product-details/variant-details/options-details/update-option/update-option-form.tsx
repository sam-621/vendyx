import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { InventoryKeys, useGetProductDetails, useRemoveVariant } from '@/app/inventory/hooks';
import { useRemoveOption } from '@/app/inventory/hooks/use-remove-option';
import { useUpdateOption } from '@/app/inventory/hooks/use-update-option';
import {
  getVariantsWithDuplicatedOptionValues,
  getVariantsWithoutOption
} from '@/app/inventory/utils';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { OptionDetailsForm } from '../option-details-form';
import { useManageOptionsStates } from '../use-manage-options';

export const UpdateOptionForm: FC<Props> = ({ option, onFinish }) => {
  const { slug } = useParams();
  const { product } = useGetProductDetails(slug ?? '');
  const { removeOption } = useRemoveOption();
  const { removeVariant } = useRemoveVariant();
  const { updateOption } = useUpdateOption();

  const state = useManageOptionsStates([
    {
      id: option.id,
      name: option.name,
      values: option.values?.map(v => ({ id: v.id, value: v.value })) ?? []
    }
  ]);

  const onRemove = async () => {
    const variantsWithoutOption = getVariantsWithoutOption(option, product?.variants?.items ?? []);
    const duplicatedVariants = getVariantsWithDuplicatedOptionValues(variantsWithoutOption);

    await removeOption(option.id);
    await Promise.all(duplicatedVariants.map(async v => await removeVariant(v.id)));
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(product?.slug ?? '') });

    onFinish();
    notification.success('Option removed successfully');
  };

  const onSave = async () => {
    const optionToUpdate = state.options[0];
    await updateOption(option.id, { name: optionToUpdate.name });
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(product?.slug ?? '') });
    onFinish();
    notification.success('Option removed successfully');
  };

  if (!state.options.length) return null;

  return (
    <OptionDetailsForm
      onSave={onSave}
      option={state.options[0]}
      updateValues={state.updateValues}
      removeOption={onRemove}
      updateOption={(name: string) => state.updateOption(state.options[0].id, name)}
    />
  );
};

type Props = {
  option: CommonProductFragment['options'][0];
  onFinish: () => void;
};
