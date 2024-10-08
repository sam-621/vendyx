import { Injectable } from '@nestjs/common';
import { Customer, Order, OrderLine, OrderState, Prisma, Shipment, Variant } from '@prisma/client';

import {
  AddCustomerToOrderInput,
  CreateAddressInput,
  CreateOrderInput,
  CreateOrderLineInput,
  ListInput,
  UpdateOrderLineInput
} from '@/api/shared';
import { CustomerRepository, OrderRepository, VariantRepository } from '@/persistance/repositories';
import { ID } from '@/persistance/types';

import {
  CustomerDisabled,
  CustomerInvalidEmail,
  ForbidenOrderAction,
  NotEnoughStock
} from './order.errors';
import { validateEmail } from '../shared/utils';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly variantRepository: VariantRepository,
    private readonly customerRepository: CustomerRepository
  ) {}

  async find(input?: ListInput) {
    return this.repository.findMany({ ...input, notInModifyinState: true });
  }

  async findUnique(id?: string, code?: string) {
    if (id) {
      return this.repository.findById(id);
    }

    if (code) {
      return this.repository.findByCode(this.parseOrderCode(code));
    }

    return null;
  }

  async create(input: CreateOrderInput) {
    const { line } = input;

    if (!line || line.quantity <= 0) {
      return await this.createEmptyOrder();
    }

    const variant = await this.variantRepository.findByIdOrThrow(line.productVariantId);

    if (variant.stock < line.quantity) {
      return new NotEnoughStock();
    }

    return this.createOrderWithLine(variant, line.quantity);
  }

  async addLine(orderId: string, input: CreateOrderLineInput) {
    const order = (await this.repository.findByIdOrThrow(orderId, {
      include: { lines: true }
    })) as Order & { lines: OrderLine[] };

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbidenOrderAction(order.state);
    }

    const variant = await this.variantRepository.findByIdOrThrow(input.productVariantId);

    if (variant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const newQuantity = input.quantity;
    const newLinePrice = newQuantity * variant.salePrice;

    const lineWithTheVariant = order.lines.find(line => line.variantId === input.productVariantId);

    // If a line with the variant already exists, only update the quantity and recalculate the line price, not adding a new line
    // NOTE: When updating, we replace the current quantity with the new one, not adding the new quantity to the current one
    if (lineWithTheVariant) {
      return await this.repository.update(orderId, {
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
      });
    }

    // Add a new line to the order
    return await this.repository.update(orderId, {
      lines: {
        create: {
          variantId: input.productVariantId,
          quantity: input.quantity,
          linePrice: newLinePrice,
          unitPrice: variant.salePrice
        }
      },
      total: order.total + newLinePrice,
      totalQuantity: order.totalQuantity + input.quantity
    });
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    const line = await this.repository.findLineWithOrderAndVariant(lineId);
    const { order, variant } = line;

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbidenOrderAction(order.state);
    }

    // If the quantity 0, remove the line and recalculate the order stats
    if (input.quantity <= 0) {
      this.repository.update(order.id, {
        lines: {
          delete: { id: line.id }
        },
        subtotal: order.subtotal - line.linePrice,
        total: order.total - line.linePrice,
        totalQuantity: order.totalQuantity - line.quantity
      });
    }

    if (variant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * input.quantity;

    // Update the line with the new quantity and line price and order stats
    await this.repository.update(order.id, {
      lines: {
        update: {
          where: { id: line.id },
          data: { quantity: input.quantity, linePrice, unitPrice }
        }
      },
      total: order.total - line.linePrice + linePrice,
      subtotal: order.subtotal - line.linePrice + linePrice,
      totalQuantity: order.totalQuantity - line.quantity + input.quantity
    });
  }

  async removeLine(lineId: ID) {
    const line = await this.repository.findLineWithOrder(lineId);

    await this.repository.update(line.order.id, {
      lines: {
        delete: { id: line.id }
      },
      total: line.order.total - line.linePrice,
      subtotal: line.order.subtotal - line.linePrice,
      totalQuantity: line.order.totalQuantity - line.quantity
    });
  }

  async addCustomer(orderId: ID, input: AddCustomerToOrderInput) {
    if (!validateEmail(input.email)) {
      return new CustomerInvalidEmail();
    }

    const order = await this.repository.findByIdOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_customer')) {
      return new ForbidenOrderAction(order.state);
    }

    const customer = await this.customerRepository.findByEmail(input.email);

    if (customer.enabled === false) {
      return new CustomerDisabled();
    }

    return this.repository.update(orderId, {
      customer: { connectOrCreate: { where: { email: input.email }, create: customer } }
    });
  }

  async addShippingAddress(orderId: ID, input: CreateAddressInput) {
    const order = await this.repository.findByIdOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_shipping_address')) {
      return new ForbidenOrderAction(order.state);
    }

    this.repository.update(orderId, {
      shippingAddress: input as unknown as Prisma.JsonObject
    });
  }

  /**
   * Validates if the order can perform the given action
   */
  private async canPerformAction(
    order: Order & { customer?: Customer; shipment?: Shipment },
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
    return this.repository.insert({});
  }

  /**
   * Create an order with a line
   */
  private async createOrderWithLine(variant: Variant, quantity: number) {
    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * quantity;

    const order = await this.repository.insert({
      lines: {
        create: { variantId: variant.id, quantity: quantity, linePrice, unitPrice }
      },
      total: linePrice,
      subtotal: linePrice,
      totalQuantity: quantity
    });

    return order;
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
