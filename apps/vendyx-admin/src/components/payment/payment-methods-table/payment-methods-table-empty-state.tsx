import { CreditCardIllustration, RawTableEmptyState } from '@/components/shared';

export const PaymentMethodsTableEmptyState = () => {
  return (
    <RawTableEmptyState
      illustration={<CreditCardIllustration />}
      description="You haven't added any payment methods yet. Add a payment method to start accepting payments."
      action={{
        label: 'Add payment method',
        href: '/settings/payments/new'
      }}
    />
  );
};
