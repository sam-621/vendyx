import { Inject, Injectable } from '@nestjs/common';
import { Customer, Order, OrderState, Prisma, Shipment, Variant } from '@prisma/client';

import {
  AddCustomerToOrderInput,
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateOrderInput,
  CreateOrderLineInput,
  ListInput,
  OrderListInput,
  UpdateOrderLineInput
} from '@/api/shared';
import { PaymentService } from '@/payment';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';
import { ID } from '@/persistance/types';
import { ShipmentService } from '@/shipments';

import {
  CustomerDisabled,
  CustomerInvalidEmail,
  ForbidenOrderAction,
  MissingShippingAddress,
  NotEnoughStock,
  OrderTransitionError,
  PaymentDeclined,
  PaymentFailed,
  PaymentMethodNotFound,
  ShippingMethodNotFound
} from './order.errors';
import { ValidOrderTransitions } from './order.utils';
import { clean, executeInSafe, validateEmail } from '../shared/utils';

@Injectable()
export class OrderService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly shipmentService: ShipmentService,
    private readonly paymentService: PaymentService
  ) {}

  async find(input?: OrderListInput) {
    return this.prisma.order.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        code: input?.filters?.code ? this.parseOrderCode(input?.filters?.code) : undefined,
        state: input?.filters?.state ? input?.filters?.state : { not: OrderState.MODIFYING }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(input?: OrderListInput) {
    return this.prisma.order.count({
      where: {
        code: input?.filters?.code ? this.parseOrderCode(input?.filters?.code) : undefined,
        state: input?.filters?.state ? input?.filters?.state : { not: OrderState.MODIFYING }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findUnique(id?: string, code?: string) {
    if (id) {
      return this.prisma.order.findUnique({ where: { id } });
    }

    if (code) {
      return this.prisma.order.findUnique({ where: { code: this.parseOrderCode(code) } });
    }

    return null;
  }

  async create(input: CreateOrderInput) {
    const { line } = input;

    if (!line || line.quantity <= 0) {
      return await this.createEmptyOrder();
    }

    const variant = await this.findVariantOrThrow(line.productVariantId);

    if (variant.stock < line.quantity) {
      return new NotEnoughStock();
    }

    return this.createOrderWithLine(variant, line.quantity);
  }

  async addLine(orderId: string, input: CreateOrderLineInput) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { lines: true }
    });

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbidenOrderAction(order.state);
    }

    const variant = await this.findVariantOrThrow(input.productVariantId);

    if (variant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const newQuantity = input.quantity;
    const newLinePrice = newQuantity * variant.salePrice;

    const lineWithTheVariant = order.lines.find(
      line => line.productVariantId === input.productVariantId
    );

    // If a line with the variant already exists, only update the quantity and recalculate the line price, not adding a new line
    // NOTE: When updating, we replace the current quantity with the new one, not adding the new quantity to the current one
    if (lineWithTheVariant) {
      return await this.prisma.order.update({
        where: { id: orderId },
        data: {
          lines: {
            update: {
              where: { id: lineWithTheVariant.id },
              data: {
                quantity: newQuantity,
                linePrice: newLinePrice,
                // Update the unit price in case the variant price has changed
                unitPrice: variant.salePrice
              }
            }
          },
          // Subtract the old line price and add the new line price to the total
          total: order.total - lineWithTheVariant.linePrice + newLinePrice,
          // Subtract the old quantity and add the new quantity to the total quantity
          totalQuantity: order.totalQuantity - lineWithTheVariant.quantity + input.quantity
        }
      });
    }

    // Add a new line to the order
    return await this.prisma.order.update({
      where: { id: orderId },
      data: {
        lines: {
          create: {
            productVariantId: input.productVariantId,
            quantity: input.quantity,
            linePrice: newLinePrice,
            unitPrice: variant.salePrice
          }
        },
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      }
    });
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    const line = await this.prisma.orderLine.findUniqueOrThrow({
      where: { id: lineId },
      include: { order: true, productVariant: true }
    });

    const { order, productVariant } = line;

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbidenOrderAction(order.state);
    }

    // If the quantity 0, remove the line and recalculate the order stats
    if (input.quantity <= 0) {
      return await this.prisma.order.update({
        where: { id: order.id },
        data: {
          lines: {
            delete: { id: line.id }
          },
          subtotal: order.subtotal - line.linePrice,
          total: order.total - line.linePrice,
          totalQuantity: order.totalQuantity - line.quantity
        }
      });
    }

    if (productVariant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const unitPrice = productVariant.salePrice;
    const linePrice = unitPrice * input.quantity;

    // Update the line with the new quantity and line price and order stats
    return await this.prisma.order.update({
      where: { id: order.id },
      data: {
        lines: {
          update: {
            where: { id: line.id },
            data: { quantity: input.quantity, linePrice, unitPrice }
          }
        },
        total: order.total - line.linePrice + linePrice,
        subtotal: order.subtotal - line.linePrice + linePrice,
        totalQuantity: order.totalQuantity - line.quantity + input.quantity
      }
    });
  }

  async removeLine(lineId: ID) {
    const line = await this.prisma.orderLine.findUniqueOrThrow({
      where: { id: lineId },
      include: { order: true }
    });

    await this.prisma.order.update({
      where: { id: line.order.id },
      data: {
        lines: {
          delete: { id: line.id }
        },
        total: line.order.total - line.linePrice,
        subtotal: line.order.subtotal - line.linePrice,
        totalQuantity: line.order.totalQuantity - line.quantity
      }
    });
  }

  async addCustomer(orderId: ID, input: AddCustomerToOrderInput) {
    if (!validateEmail(input.email)) {
      return new CustomerInvalidEmail();
    }

    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_customer')) {
      return new ForbidenOrderAction(order.state);
    }

    const customer = await this.prisma.customer.findUniqueOrThrow({
      where: { email: input.email }
    });

    if (customer.enabled === false) {
      return new CustomerDisabled();
    }

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { customer: { connectOrCreate: { where: { email: input.email }, create: customer } } }
    });
  }

  async addShippingAddress(orderId: ID, input: CreateAddressInput) {
    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_shipping_address')) {
      return new ForbidenOrderAction(order.state);
    }

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { shippingAddress: input as unknown as Prisma.JsonObject }
    });
  }

  async addShipment(orderId: ID, input: AddShipmentToOrderInput) {
    const order = await this.findOrderOrThrow(orderId);

    if (!order.shippingAddress) {
      return new MissingShippingAddress();
    }

    if (!this.canPerformAction(order, 'add_shipment')) {
      return new ForbidenOrderAction(order.state);
    }

    const method = await this.prisma.shippingMethod.findUnique({
      where: { id: input.methodId, enabled: true },
      include: { shippingHandler: true }
    });

    if (!method) {
      return new ShippingMethodNotFound();
    }

    const shippingPrice = await this.shipmentService.calculatePrice(
      order,
      method.shippingHandler.handlerCode,
      method.handlerMetadata as Record<string, string>
    );

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        shipment: { create: { amount: shippingPrice, method: method.name } },
        total: order.total + shippingPrice
      }
    });
  }

  async addPayment(orderId: ID, input: AddPaymentToOrderInput) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { customer: true, lines: { include: { productVariant: true } } }
    });

    if (!this.canPerformAction(order, 'add_payment')) {
      return new ForbidenOrderAction(order.state);
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.PAYMENT_ADDED))) {
      return new OrderTransitionError('Either customer or shipment is missing.');
    }

    const method = await this.prisma.paymentMethod.findUnique({
      where: { id: input.methodId, enabled: true },
      include: { paymentIntegration: true }
    });

    if (!method) {
      return new PaymentMethodNotFound();
    }

    const paymentHandlerResult = await executeInSafe(() =>
      this.paymentService.create(
        order,
        method.paymentIntegration.handlerCode,
        method.integrationMetadata as Record<string, string>
      )
    );

    if (!paymentHandlerResult) {
      return new PaymentFailed();
    }

    if (paymentHandlerResult.status === 'declined') {
      return new PaymentDeclined(paymentHandlerResult.error, paymentHandlerResult.rawError);
    }

    let orderToReturn: Order = order;

    if (paymentHandlerResult.status === 'created') {
      orderToReturn = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          payment: {
            create: { amount: paymentHandlerResult.amount, method: method.paymentIntegration.name }
          },
          state: OrderState.PAYMENT_ADDED,
          placedAt: new Date()
        }
      });
    }

    if (paymentHandlerResult.status === 'authorized') {
      orderToReturn = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          payment: {
            create: {
              amount: paymentHandlerResult.amount,
              method: method.paymentIntegration.name,
              transactionId: paymentHandlerResult.transactionId
            }
          },
          state: OrderState.PAYMENT_AUTHORIZED,
          placedAt: new Date()
        }
      });
    }

    // Decrement the stock of the bought variants
    await this.prisma.$transaction(
      order.lines.map(line =>
        this.prisma.variant.update({
          where: { id: line.productVariant.id },
          data: { stock: { decrement: line.quantity } }
        })
      )
    );

    return orderToReturn;
  }

  /**
   * Validates if the order can perform the given action
   */
  private async canPerformAction(
    order: Order & { customer?: Customer | null; shipment?: Shipment | null },
    action: OrderAction
  ) {
    if (action === 'modify') return order.state === OrderState.MODIFYING;

    if (action === 'add_customer') return order.state === OrderState.MODIFYING;

    if (action === 'add_shipping_address') return order.state === OrderState.MODIFYING;

    if (action === 'add_shipment') {
      const hasShippingAddress = Boolean(order.shippingAddress);

      return hasShippingAddress && order.state === OrderState.MODIFYING;
    }

    if (action === 'add_payment') {
      const hasCustomer = Boolean(order.customer);
      const hasShipment = Boolean(order.shipment);

      return hasCustomer && hasShipment && order.state === OrderState.MODIFYING;
    }

    if (action === 'mark_as_shipped') return order.state === OrderState.PAYMENT_AUTHORIZED;

    if (action === 'mark_as_delivered') return order.state === OrderState.SHIPPED;

    if (action === 'cancel') return order.state !== OrderState.CANCELED;
  }

  /**
   * Validate if the order can transition to the new state
   */
  private async validateOrderTransitionState(order: Order, newState: OrderState) {
    const prevState = order.state;
    const nextState = newState;

    const transitionStateAllowed = ValidOrderTransitions.some(
      t => t[0] === prevState && t[1] === nextState
    );

    if (!transitionStateAllowed) {
      return false;
    }

    if (nextState === OrderState.PAYMENT_ADDED || nextState === OrderState.PAYMENT_AUTHORIZED) {
      const orderToVerify = await this.prisma.order.findUniqueOrThrow({
        where: { id: order.id },
        include: { customer: true, shipment: true }
      });

      if (!orderToVerify?.customer || !orderToVerify?.shipment) {
        return false;
      }
    }

    return transitionStateAllowed;
  }

  /**
   * Parse order code to get the raw order code
   *
   * @example
   * const orderCode = '#0001'
   * const rawOrderCode = parseOrderCode(orderCode)
   * console.log(rawOrderCode) // 1
   */
  private parseOrderCode(code: string) {
    return Number(code.replace('#', ''));
  }

  /**
   * Create an empty order without any line
   */
  private async createEmptyOrder() {
    return this.prisma.order.create({ data: {} });
  }

  /**
   * Create an order with a line
   */
  private async createOrderWithLine(variant: Variant, quantity: number) {
    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * quantity;

    return await this.prisma.order.create({
      data: {
        lines: {
          create: { productVariantId: variant.id, quantity: quantity, linePrice, unitPrice }
        },
        total: linePrice,
        subtotal: linePrice,
        totalQuantity: quantity
      }
    });
  }

  private async findOrderOrThrow(id: ID) {
    return this.prisma.order.findUniqueOrThrow({ where: { id } });
  }

  private async findVariantOrThrow(id: ID) {
    return this.prisma.variant.findUniqueOrThrow({ where: { id } });
  }
}

type OrderAction =
  | 'modify'
  | 'add_customer'
  | 'add_shipping_address'
  | 'add_shipment'
  | 'add_payment'
  | 'mark_as_shipped'
  | 'mark_as_delivered'
  | 'cancel';
