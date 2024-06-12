import { type FC } from 'react';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { NewOptionForm } from './new-option/new-option-form';
import { OptionsListing } from './options-listing/options-listing';

export const OptionsDetails: FC<Props> = ({ options }) => {
  return (
    <>
      <OptionsListing options={options} />

      <NewOptionForm defaultOptions={options} />
    </>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
