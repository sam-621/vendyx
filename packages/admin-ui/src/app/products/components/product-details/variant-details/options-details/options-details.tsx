import { type FC } from 'react';

import { cn } from '@ebloc/theme';

import { useOptionDetailsContext } from '@/app/products/context';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { NewOptionForm } from './new-option/new-option-form';
import { OptionsListing } from './options-listing/options-listing';

export const OptionsDetails: FC<Props> = ({ options: defaultOptions }) => {
  const { options } = useOptionDetailsContext();

  if (!defaultOptions?.length && !options.length) return null;

  return (
    <div className={cn('mx-6 flex flex-col rounded-lg border divide-y')}>
      <OptionsListing options={defaultOptions} />
      <NewOptionForm defaultOptions={defaultOptions} />
    </div>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
