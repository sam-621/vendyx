export type PaypalGenerateAccessTokenResponse = {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
};

export type PaypalCapturePaymentResponse = {
  id: string;
  status: string;
  payment_source: {
    paypal: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      account_id: string;
    };
  };
  purchase_units: [
    {
      reference_id: string;
      shipping: {
        address: {
          address_line_1: string;
          address_line_2: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: string;
        };
      };
      payments: {
        captures: [
          {
            id: string;
            status: string;
            amount: {
              currency_code: string;
              value: string;
            };
            seller_protection: {
              status: string;
              dispute_categories: string[];
            };
            final_capture: true;
            disbursement_mode: string;
            seller_receivable_breakdown: {
              gross_amount: {
                currency_code: string;
                value: string;
              };
              paypal_fee: {
                currency_code: string;
                value: string;
              };
              net_amount: {
                currency_code: string;
                value: string;
              };
            };
            create_time: string;
            update_time: string;
            links: [
              {
                href: string;
                rel: string;
                method: string;
              },
              {
                href: string;
                rel: string;
                method: string;
              }
            ];
          }
        ];
      };
    }
  ];
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
  };
  links: [
    {
      href: string;
      rel: string;
      method: string;
    }
  ];
};

export type CreatePaypalOrderResponse = {
  id: string;
  status: string;
  payment_source: {
    paypal: {};
  };
  links: [
    {
      href: string;
      rel: string;
      method: string;
    },
    {
      href: string;
      rel: string;
      method: string;
    }
  ];
};

export type PaypalErrorResponse = {
  name: string;
  message: string;
  debug_id: string;
  details: {
    field: string;
    value: string;
    location: string;
    issue: string;
    description: string;
  }[];
  links: {
    'https://error_documentation_link': string;
    rel: 'information_link';
    encType: 'application/json';
  }[];
};

JSON.stringify({
  intent: 'CAPTURE',
  purchase_units: [
    {
      reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
      amount: { currency_code: 'USD', value: '100.00' }
    }
  ],
  payment_source: {
    paypal: {
      experience_context: {
        payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
        brand_name: 'EXAMPLE INC',
        locale: 'en-US',
        landing_page: 'LOGIN',
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        user_action: 'PAY_NOW',
        return_url: 'https://example.com/returnUrl',
        cancel_url: 'https://example.com/cancelUrl'
      }
    }
  }
});
