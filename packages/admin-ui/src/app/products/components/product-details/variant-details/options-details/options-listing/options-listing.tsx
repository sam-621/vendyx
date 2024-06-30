import { type FC } from 'react';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { OptionItem } from './option-item';

export const OptionsListing: FC<Props> = ({ options: defaultOptions }) => {
  if (!defaultOptions?.length) return;

  return (
    <div className="divide-y">
      {defaultOptions?.map((option, i) => (
        <div key={option.id}>
          <OptionItem option={option} position={i + 1} />
        </div>
      ))}
    </div>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
