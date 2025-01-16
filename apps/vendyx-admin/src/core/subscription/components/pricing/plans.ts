export const getPlans = (isAnnually: boolean) => [
  {
    title: 'Basic',
    price: isAnnually ? `$${Math.round((19 * 10) / 12)}` : '$19',
    recurrence: 'Per month',
    features: [
      'Up to 50 products',
      '1 payment gateway integrations',
      '24/7 support via email, chat, and calls',
      'Onboarding and personalized consulting'
    ],
    buttonText: 'Upgrade to BASIC'
  },
  {
    title: 'Essential',
    price: isAnnually ? `$${Math.round((29 * 10) / 12)}` : '$29',
    recurrence: 'Per month',
    features: [
      'Up to 100 products',
      '2 payment gateway integrations',
      '24/7 support via email, chat, and calls',
      'Onboarding and personalized consulting'
    ],
    buttonText: 'Upgrade to ESSENTIAL',
    isFeatured: true
  },
  {
    title: 'Business',
    price: 'Custom',
    recurrence: 'Contact sales',
    features: [
      'Unlimited products',
      '3 payment gateway integrations',
      '24/7 support via email, chat, and calls',
      'Onboarding and personalized consulting'
    ],
    buttonText: 'Upgrade to BUSINESS'
  }
];
