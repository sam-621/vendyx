import { Inject, Injectable, Logger } from '@nestjs/common';

import { formatOrderCode } from '@/business/order';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';
import { ID } from '@/persistence/types';

import { MailClientSendInput, SendGridClient } from './clients';
import { createCustomerRegisteredMail, createOrderConfirmationTemplate } from './templates';

@Injectable()
export class MailService {
  constructor(
    private readonly sendGridClient: SendGridClient,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  async sendOrderConfirmationEmail(orderId: ID): Promise<void> {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: {
        customer: true,
        shipment: true,
        shop: true,
        lines: {
          include: {
            productVariant: {
              include: {
                asset: true,
                variantOptionValues: { include: { optionValue: true } },
                product: { include: { assets: { include: { asset: true } } } }
              }
            }
          }
        }
      }
    });

    const orderInput = {
      ...order,
      lines: order.lines.map(line => ({
        ...line,
        variant: {
          ...line.productVariant,
          optionValues: line.productVariant.variantOptionValues.map(vo => vo.optionValue),
          product: {
            ...line.productVariant.product,
            assets: line.productVariant.product.assets.map(asset => asset.asset)
          }
        }
      }))
    };

    const html = await createOrderConfirmationTemplate({ order: orderInput, shop: order.shop });

    // TODO: Log? throw?
    if (!order.customer?.email) return;

    const mail: MailClientSendInput = {
      to: order.customer.email,
      from: { email: 'vendyxmail@gmail.com', name: order.shop.name },
      subject: 'We received your order',
      html
    };

    const success = await this.sendGridClient.send(mail);

    if (!success) {
      Logger.error(
        `order confirmation email failed for order ${formatOrderCode(order.code)} in shop ${
          order.shop.name
        }`
      );
    } else {
      Logger.log(
        `order confirmation email sent for order ${formatOrderCode(order.code)} in shop ${
          order.shop.name
        }`
      );
    }
  }

  async sendCustomerRegisteredEmail(customerId: ID): Promise<void> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: { shop: true }
    });

    if (!customer) return;

    const html = await createCustomerRegisteredMail({ customer, shop: customer.shop });

    const mail: MailClientSendInput = {
      to: customer.email,
      from: { email: 'vendyxmail@gmail.com', name: customer.shop.name },
      subject: `Welcome to ${customer.shop.name}`,
      html
    };

    const success = await this.sendGridClient.send(mail);

    if (!success) {
      Logger.error(
        `customer registered email failed for customer ${customer.email} in shop ${customer.shop.name}`
      );
    } else {
      Logger.log(
        `customer registered email sent for customer ${customer.email} in shop ${customer.shop.name}`
      );
    }
  }
}
