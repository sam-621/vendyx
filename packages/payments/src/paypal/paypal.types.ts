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
    rel: string;
    encType: string;
  }[];
};

export type PaypalOrderId = string;

export type PaypalError = {
  message: String;
  code: PaypalErrorCode;
};

export enum PaypalErrorCode {
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  PAYPAL_ERROR = 'PAYPAL_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
