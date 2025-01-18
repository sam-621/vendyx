import { useState } from 'react';

import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { LOOKUP_KEYS } from '@/shared/utils/lookup-keys';

import { PricingTable } from '../pricing/pricing-table';
import { useChoosePlan } from './use-choose-plan';

export const ChoosePlan = () => {
  const [isAnnually, setIsAnnually] = useState(false);

  const { isLoading: isBasicLoading, choosePlan: chooseBasic } = useChoosePlan(
    isAnnually ? LOOKUP_KEYS.BASIC_YEARLY : LOOKUP_KEYS.BASIC_MONTHLY
  );
  const { isLoading: isEssentialLoading, choosePlan: chooseEssential } = useChoosePlan(
    isAnnually ? LOOKUP_KEYS.ESSENTIAL_YEARLY : LOOKUP_KEYS.ESSENTIAL_MONTHLY
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-10 md:flex-row mb-6">
        <h1 className="text-2xl font-medium">Choose plan</h1>

        <div className="flex h-11 w-fit shrink-0 items-center rounded-md bg-muted p-1 text-lg">
          <RadioGroup
            defaultValue="monthly"
            className="h-full grid-cols-2"
            onValueChange={value => {
              setIsAnnually(value === 'annually');
            }}
          >
            <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-card'>
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex h-full cursor-pointer items-center justify-center px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
              >
                Monthly
              </Label>
            </div>
            <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-card'>
              <RadioGroupItem value="annually" id="annually" className="peer sr-only" />
              <Label
                htmlFor="annually"
                className="flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
              >
                Yearly
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
        <PricingTable
          title="Basic"
          price={isAnnually ? `$${Math.round((19 * 10) / 12)}` : '$19'}
          recurrence="Per month"
          features={[
            'Up to 50 products',
            '1 payment gateway integrations',
            '24/7 support via email, chat, and calls',
            'Onboarding and personalized consulting'
          ]}
          buttonText="Choose BASIC"
          onClick={() => chooseBasic()}
          isLoading={isBasicLoading}
        />

        <PricingTable
          title="Essential"
          price={isAnnually ? `$${Math.round((59 * 10) / 12)}` : '$59'}
          recurrence="Per month"
          features={[
            'Up to 500 active products',
            'Unlimited payment gateway integrations',
            '24/7 support via email, chat, and calls',
            'Onboarding and personalized consulting'
          ]}
          buttonText="Choose ESSENTIAL"
          onClick={() => chooseEssential()}
          isLoading={isEssentialLoading}
        />

        <PricingTable
          title="Enterprise"
          price="Custom"
          recurrence="Contact sales"
          features={[
            'Unlimited active products',
            'Unlimited payment gateway integrations',
            '24/7 support via email, chat, and calls',
            'Onboarding and personalized consulting'
          ]}
          buttonText="Choose BUSINESS"
        />
      </div>
    </div>
  );
};
