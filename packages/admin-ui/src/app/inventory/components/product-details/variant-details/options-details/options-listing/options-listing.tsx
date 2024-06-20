import { type FC } from 'react';

import { Separator } from '@ebloc/theme';

import { useOptionDetailsContext } from '@/app/inventory/context';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { MAX_OPTIONS_ALLOWED } from '../use-manage-options';
import { OptionItem } from './option-item';

export const OptionsListing: FC<Props> = ({ options: defaultOptions }) => {
  const { options } = useOptionDetailsContext();

  if (!defaultOptions?.length) return;

  return (
    <div>
      {defaultOptions?.map((option, i) => (
        <div key={option.id}>
          <OptionItem option={option} />
          {i + 1 === defaultOptions.length &&
          defaultOptions.length + (options.length ?? 0) === MAX_OPTIONS_ALLOWED ? null : (
            <Separator />
          )}
        </div>
      ))}
    </div>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
