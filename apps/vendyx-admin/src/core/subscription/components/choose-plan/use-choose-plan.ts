import { useTransition } from 'react';

import { createCheckoutSession } from '../../actions/create-checkout-session';

export const useChoosePlan = (lookupKey: string) => {
  const [isLoading, startTransition] = useTransition();

  const exec = () => {
    startTransition(async () => {
      await createCheckoutSession(lookupKey);
    });
  };

  return {
    isLoading,
    choosePlan: exec
  };
};
