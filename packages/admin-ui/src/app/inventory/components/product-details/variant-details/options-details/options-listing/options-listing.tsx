import { type FC } from 'react';

import { Separator } from '@ebloc/theme';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { OptionItem } from './option-item';

export const OptionsListing: FC<Props> = ({ options }) => {
  return (
    <>
      {options?.map((option, i) => (
        <div key={option.id} className="flex flex-col gap-4">
          <OptionItem option={option} />
          {options?.length !== i + 1 && <Separator />}
        </div>
      ))}
    </>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
