import { type FC } from 'react';

import { Badge, Label, Separator } from '@vendyx/theme';

import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

import { OptionActions } from './option-actions';

export const OptionsListing: FC<Props> = ({ options }) => {
  return (
    <>
      {options?.map((option, i) => (
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
            <OptionActions />
          </div>
          {options?.length !== i + 1 && <Separator />}
        </>
      ))}
    </>
  );
};

type Props = {
  options: CommonProductFragment['options'] | undefined | null;
};
