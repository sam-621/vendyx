import { Injectable, Inject } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PaypalPluginConfig } from './paypal.plugin';
import { PAYPAL_PLUGIN_CONFIG } from './paypal.constants';
import axios, { isAxiosError } from 'axios';
import {
  CreatePaypalOrderResponse,
  PaypalCapturePaymentResponse,
  PaypalErrorCode,
  PaypalErrorResponse,
  PaypalGenerateAccessTokenResponse
} from './paypal.types';
import { ErrorResult, generateReadableId, ID, OrderEntity } from '@ebloc/core';
import { convertToDollar } from '@ebloc/common';
import { CreateOrderRequestBody, OrderResponseBody } from '@paypal/paypal-js';

const PAYPAL_SANDBOX_BASE_URL = 'https://api-m.sandbox.paypal.com';
const PAYPAL_LIVE_BASE_URL = 'https://api-m.paypal.com';
/**
 *
 *
 *
 * @see https://docs.nestjs.com/fundamentals/module-ref
 *
 *
 *
 */
@Injectable()
export class PaypalService {
  constructor(
    @Inject(PAYPAL_PLUGIN_CONFIG) private config: PaypalPluginConfig,
    @InjectDataSource() private db: DataSource
  ) {}

  /**
   * Create a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  async createOrder(orderId: ID) {
    try {
      const order = await this.db.getRepository(OrderEntity).findOne({
        where: { id: orderId },
        relations: {
          lines: { productVariant: { product: true, optionValues: { option: true } } },
          shipment: true
        }
      });

      if (!order) {
        return new ErrorResult(PaypalErrorCode.ORDER_NOT_FOUND, 'Order not found');
      }

      const accessToken = await this.generateAccessToken();

      const payload: CreateOrderRequestBody = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            invoice_id: this.generateInvoiceId(),
            items: order.lines.map(line => ({
              name: line.productVariant.product.name,
              quantity: String(line.quantity),
              unit_amount: {
                value: String(convertToDollar(line.unitPrice)),
                currency_code: 'USD'
              },
              category: 'PHYSICAL_GOODS',
              description: line.productVariant.optionValues
                ?.map(option => `${option.option.name}: ${option.value}`)
                .join(', ')
            })),
            amount: {
              value: String(convertToDollar(order.total)),
              currency_code: 'USD',
              breakdown: {
                shipping: {
                  currency_code: 'USD',
                  value: String(convertToDollar(order.shipment?.amount ?? 0))
                },
                item_total: {
                  value: String(convertToDollar(order.subtotal)),
                  currency_code: 'USD'
                }
              }
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

      return data.id;
    } catch (error) {
      if (isAxiosError(error)) {
        const paypalError: PaypalErrorResponse = error.response?.data;

        return new ErrorResult(
          PaypalErrorCode.PAYPAL_ERROR,
          "Couldn't create paypal order",
          paypalError
        );
      }

      return new ErrorResult(PaypalErrorCode.UNKNOWN_ERROR, "Couldn't create paypal order", error);
    }
  }

  /**
   * Capture payment for a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  async capturePayment(paypalOrderId: string): Promise<CapturePaymentResult> {
    try {
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

      const orderDetails = await this.getOrderDetails(paypalOrderId);

      return {
        success: true,
        data,
        invoiceId: orderDetails.purchase_units?.[0].invoice_id ?? ''
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const paypalError: PaypalErrorResponse = error.response?.data;

        return { success: false, error: paypalError };
      } else {
        return { success: false, error: error };
      }
    }
  }

  /**
   * Get paypal order details
   */
  private async getOrderDetails(orderId: string) {
    const accessToken = await this.generateAccessToken();

    const { data } = await axios.get<OrderResponseBody>(
      `${this.getBaseUrl()}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log({
      data
    });

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

  /**
   * @description
   * Generates an invoice id for the paypal order. This is needed to have a common identifier between ebloc and paypal.
   */
  private generateInvoiceId() {
    const id = generateReadableId();

    return `PPAL-${id}`;
  }

  private getBaseUrl() {
    return this.config.devMode ? PAYPAL_SANDBOX_BASE_URL : PAYPAL_LIVE_BASE_URL;
  }
}

type CapturePaymentResult =
  | {
      success: true;
      data: PaypalCapturePaymentResponse;
      /**
       * @description
       * The invoice id which the paypal order was created with.
       * Paypal does not return the actual transaction id that is shared between the buyer and the seller,
       * so to have a common id between ebloc and paypal, we generate an invoice id and use it as the transaction id.
       */
      invoiceId: string;
    }
  | {
      success: false;
      error: any;
    };
