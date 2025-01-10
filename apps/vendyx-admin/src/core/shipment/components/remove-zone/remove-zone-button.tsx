import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api/types';
import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useRemoveZone } from './use-remove-zone';

export const RemoveZoneButton: FC<Props> = ({ zone }) => {
  const { isLoading, removeZone } = useRemoveZone();

  return (
    <div className="flex justify-end">
      <RemoveEntityButton
        className="w-fit"
        title={`Remove zone "${zone.name}"`}
        description="You will stop shipping to this zone."
        onRemove={() => removeZone(zone.id)}
        trigger="button"
        isLoading={isLoading}
      />
    </div>
  );
};

type Props = {
  zone: CommonZoneFragment;
};
