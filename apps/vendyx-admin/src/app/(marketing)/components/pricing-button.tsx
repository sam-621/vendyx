'use client';

import { Button } from '@/shared/components/ui/button';

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
