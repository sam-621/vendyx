'use client';

import { Button } from '@/lib/shared/components';

export const PricingButton = () => {
  return (
    <Button
      variant="link"
      onClick={() => {
        'use client';
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }}
    >
      Pricing
    </Button>
  );
};
