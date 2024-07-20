import { Injectable, Inject } from '@nestjs/common';
import { PaypalPluginConfig } from './paypal.plugin';
import { PAYPAL_PLUGIN_CONFIG } from './paypal.constants';
import axios from 'axios';
import {
  CreatePaypalOrderResponse,
  PaypalCapturePaymentResponse,
  PaypalGenerateAccessTokenResponse
} from './paypal.types';
import { ID } from '@ebloc/core';
import { CreateOrderRequestBody } from '@paypal/paypal-js';

const PAYPAL_SANDBOX_BASE_URL = 'https://api-m.sandbox.paypal.com';
const PAYPAL_LIVE_BASE_URL = 'https://api-m.paypal.com';

@Injectable()
export class PaypalService {
  constructor(@Inject(PAYPAL_PLUGIN_CONFIG) private config: PaypalPluginConfig) {}

  async createOrder(orderId: ID) {
    const accessToken = await this.generateAccessToken();

    const payload: CreateOrderRequestBody = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: '100.00'
          }
        }
      ]
    };

    const { data } = await axios.post<CreatePaypalOrderResponse>(
      `${this.getBaseUrl()}/v2/checkout/orders`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
          // Uncomment one of these to force an error for negative testing (in sandbox mode only).
          // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
      }
    );

    return data;
  }

  /**
   * Capture payment for a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  async capturePayment(paypalOrderId: string) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.getBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`;
    const { data } = await axios.post<PaypalCapturePaymentResponse>(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
          // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
          // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
      }
    );

    return data;
  }

  /**
   * Generates an access token for the paypal api
   *
   * @see https://developer.paypal.com/api/rest/#link-getaccesstoken
   */
  private async generateAccessToken() {
    const { clientId, secret } = this.config;

    if (!clientId || !secret) {
      throw new Error('generateAccessToken: Paypal client id and secret are required');
    }

    const token = Buffer.from(clientId + ':' + secret).toString('base64');

    const { data } = await axios.post<PaypalGenerateAccessTokenResponse>(
      `${this.getBaseUrl()}/v1/oauth2/token`,
      { grant_type: 'client_credentials' },
      {
        headers: {
          Authorization: `Basic ${token}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return data.access_token;
  }

  private getBaseUrl() {
    return this.config.devMode ? PAYPAL_SANDBOX_BASE_URL : PAYPAL_LIVE_BASE_URL;
  }
}
