import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { getFormattedPrice } from '@vendyx/common';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Separator
} from '@vendyx/theme';
import { MoreHorizontalIcon, PlusIcon, Trash2Icon } from 'lucide-react';

import { FormInput } from '@/app/components/forms';
import { t } from '@/lib/locales';
import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

import { type ProductDetailsFormInput } from '../use-product-details-form';
import { OptionDetails } from './option-details';
import { useManageOptionsSates } from './use-manage-variants';

// Show variants and options saved
// TODO: Save options, update variants and remove variants from ui
export const VariantDetails: FC<Props> = ({ variants, options: defaultOptions }) => {
  const { options, addOption, removeOption, updateOption, updateValues } = useManageOptionsSates();
  const { register, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;
  const defaultVariant = variants?.items[0];
  const hasOptions = Boolean(defaultOptions?.length);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>{t('product-details.pricing.title')}</CardTitle>
        {!options.length && !defaultOptions?.length && (
          <Button className="text-distinct" variant="link" type="button" onClick={addOption}>
            <PlusIcon size={16} />
            Add options
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* options saved */}
        {defaultOptions?.map((option, i) => (
          <>
            <div key={option.id} className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <Label>{option.name}</Label>
                <div className="flex gap-2">
                  {option.values?.map(value => (
                    <Badge key={value.id} variant="secondary">
                      {value.value}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </div>
            {defaultOptions.length !== i + 1 && <Separator />}
          </>
        ))}

        {/* <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <span>S</span>
            </div>
            <div className="flex gap-2 items-end">
              <FormInput label="Price" placeholder="$ 0.00" />
              <FormInput label="SKU" placeholder="SKU - 000" />
              <FormInput label="Quantity" placeholder="0" />
              <Button variant="ghost" size="icon" className="p-2">
                <Trash2Icon size={16} />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>M</span>
            </div>
            <div className="flex gap-2 items-end">
              <FormInput label="Price" placeholder="$ 0.00" />
              <FormInput label="SKU" placeholder="SKU - 000" />
              <FormInput label="Quantity" placeholder="0" />
              <Button variant="ghost" size="icon" className="p-2">
                <Trash2Icon size={16} />
              </Button>
            </div>
          </div>
        </div> */}
        {/* Option form start */}
        {Boolean(options.length) && (
          <div className="flex flex-col gap-4">
            {options.map((op, i) => (
              <>
                <OptionDetails
                  key={op.id}
                  option={op}
                  removeOption={() => removeOption(op.id)}
                  updateOption={(name: string) => updateOption(op.id, name)}
                  updateValues={updateValues}
                />
                {/* Only add separator when are more than one options and is not the last one */}
                {options.length > 1 && i !== options.length - 1 && <Separator />}
              </>
            ))}
          </div>
        )}
        {/* Option form ends */}

        {(options.length || defaultOptions?.length) && (
          <div>
            <Separator />
            <Button
              type="button"
              variant="link"
              className="text-distinct hover:no-underline"
              onClick={addOption}
            >
              <PlusIcon size={16} /> Add option
            </Button>
            <Separator />
          </div>
        )}

        {/* Variants generated */}
        {variants?.items.map(variant => (
          <div key={variant.id} className="flex justify-between items-center">
            <div className="flex gap-1">
              {variant.optionValues?.map((optionValue, i) => (
                <>
                  <span key={optionValue.id}>{optionValue.value}</span>
                  {variant.optionValues?.length !== i + 1 && <span>/</span>}
                </>
              ))}
            </div>
            <div className="flex gap-2 items-end">
              <FormInput label="Price" placeholder="$ 0.00" />
              <FormInput label="SKU" placeholder="SKU - 000" />
              <FormInput label="Quantity" placeholder="0" />
              <Button variant="ghost" size="icon" className="p-2">
                <Trash2Icon size={16} />
              </Button>
            </div>
          </div>
        ))}

        {/* Form when no options added */}
        {!hasOptions && (
          <div className="flex gap-4">
            <FormInput
              {...register('price')}
              error={errors.price?.message}
              defaultValue={getFormattedPrice(defaultVariant?.price ?? 0).replace('$', '')}
              type="text"
              label={t('product-details.pricing.input.price')}
              placeholder="$ 0.00"
            />
            <FormInput
              {...register('sku')}
              error={errors.sku?.message}
              defaultValue={defaultVariant?.sku}
              label={t('product-details.pricing.title')}
              placeholder="SKU - 000"
            />
            <FormInput
              {...register('quantity')}
              error={errors.quantity?.message}
              defaultValue={defaultVariant?.stock}
              type="number"
              label={t('product-details.pricing.input.quantity')}
              placeholder="0"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  options?: CommonProductFragment['options'];
  variants?: CommonProductFragment['variants'];
};
