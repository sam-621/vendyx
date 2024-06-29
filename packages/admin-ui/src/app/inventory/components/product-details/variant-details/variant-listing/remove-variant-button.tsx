import { type FC } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useProductDetailsContext } from '@/app/inventory/context';
import {
  ProductKeys,
  useCreateVariant,
  useRemoveOption,
  useRemoveOptionValues,
  useRemoveVariant
} from '@/app/inventory/hooks';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const RemoveVariantButton: FC<Props> = ({ variant }) => {
  const { product } = useProductDetailsContext();
  const { removeVariant } = useRemoveVariant();
  const { createVariant } = useCreateVariant();
  const { removeOptionValues } = useRemoveOptionValues();
  const { removeOption } = useRemoveOption();

  const variantName = variant.optionValues?.map(({ value }) => value).join(' / ');

  const onRemove = async () => {
    await removeVariant(variant.id);
    const optionValuesRemoved = await removeUnusedOptionValues();

    const productOptions = product?.options ?? [];

    const optionsToRemove = productOptions.filter(option =>
      option.values?.every(value => optionValuesRemoved?.includes(value.id))
    );

    if (optionsToRemove?.length) {
      await Promise.all(optionsToRemove.map(async option => await removeOption(option.id)));
    }

    const isTheLastVariant = product?.variants?.items?.length === 1;

    if (isTheLastVariant) {
      await createVariant(product.id, {
        price: 0,
        sku: '',
        stock: 0,
        published: true
      });
    }

    await queryClient.invalidateQueries({
      queryKey: ProductKeys.single(product?.slug ?? '')
    });

    notification.success(`Variant ${variantName} removed`);
  };

  const removeUnusedOptionValues = async () => {
    const variantsWithoutRemoved =
      product?.variants?.items?.filter(({ id: currentId }) => currentId !== variant.id) ?? [];

    const optionValuesInUse = variantsWithoutRemoved
      .map(variant => variant.optionValues)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesInProduct = product?.options
      .map(option => option.values)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesToDelete = optionValuesInProduct?.filter(
      optionValue => !optionValuesInUse.includes(optionValue)
    );

    if (optionValuesToDelete?.length) {
      await removeOptionValues(optionValuesToDelete);
    }

    return optionValuesToDelete ?? [];
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2" type="button">
          <Trash2Icon size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Remove variant &quot;{variantName}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will remove variant &quot;{variantName}&quot; from your store. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onRemove}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  variant: CommonProductFragment['variants']['items'][0];
};
