import { type FC } from 'react';

import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

import { NewOptionForm } from './new-option/new-option-form';
import { OptionsListing } from './options-listing/options-listing';

export const OptionsDetails: FC<Props> = ({ isAdding, options }) => {
  return (
    <>
      <OptionsListing options={options} />

      {isAdding && <NewOptionForm />}
    </>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
  isAdding: boolean;
};
