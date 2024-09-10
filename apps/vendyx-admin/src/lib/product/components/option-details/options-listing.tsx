import { PlusIcon } from 'lucide-react';

import { Button } from '@/lib/shared/components';

import { MAX_OPTIONS_ALLOWED, useVariantContext } from '../variant-details';
import { OptionDetails } from './option-details';

export const OptionsListing = () => {
  const { options, appendOption } = useVariantContext();

  if (!options.length) {
    return (
      <Button
        onClick={() => appendOption()}
        className="text-distinct p-0 h-fit"
        variant="link"
        type="button"
      >
        <PlusIcon size={16} />
        Add options
      </Button>
    );
  }

  return (
    <div className="border rounded-md divide-y overflow-hidden">
      {options.map(option => (
        <OptionDetails key={option.id} option={option} />
      ))}
      {options.length < MAX_OPTIONS_ALLOWED && (
        <div className="flex h-14 hover:bg-muted/50 rounded-b-md border-t">
          <Button
            type="button"
            variant="link"
            className="text-distinct hover:no-underline p-0 h-full w-full"
            onClick={() => appendOption()}
          >
            <PlusIcon size={16} /> Add option
          </Button>
        </div>
      )}
    </div>
  );
};
