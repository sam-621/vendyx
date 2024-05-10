import { ValidationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { validateEmail } from '../utils';

import {
  CreateAddressInput,
  CreateCustomerInput,
  CreateOrderLineInput,
  ListInput,
  UpdateOrderLineInput,
} from '@/app/api/common';
import {
  AddressEntity,
  CustomerEntity,
  ID,
  OrderEntity,
  OrderLineEntity,
  VariantEntity,
} from '@/app/persistance';
import { UserInputError } from '@/lib/errors';

@Injectable()
export class OrderService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async find(input: ListInput) {
    return await this.db.getRepository(OrderEntity).find({
      skip: input?.skip,
      take: input?.take,
      order: { createdAt: 'DESC' },
    });
  }

  async findUnique(id: ID, code: string) {
    if (id) {
      return this.findById(id);
    }

    if (code) {
      return this.findByCode(code);
    }

    throw new UserInputError('No ID or CODE provided');
  }

  async findLines(orderId: ID) {
    const lines = await this.db.getRepository(OrderLineEntity).find({
      where: { order: { id: orderId } },
      order: { createdAt: 'DESC' },
    });

    return lines;
  }

  async findVariantInLine(orderLineId: ID) {
    const orderLine = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: orderLineId },
      relations: { productVariant: true },
    });

    return orderLine.productVariant;
  }

  async findCustomer(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { customer: true },
    });

    return order.customer;
  }

  async findShippingAddress(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
    });

    // The shipping address could be a json or a Address entity, so we need to normalize it
    return { id: '', createdAt: '', updatedAt: '', ...order.shippingAddress };
  }

  async create() {
    const ordersCount = await this.db.getRepository(OrderEntity).count();
    const order = this.db.getRepository(OrderEntity).create({
      code: String(ordersCount + 1),
    });

    return await this.db.getRepository(OrderEntity).save(order);
  }

  async addLine(orderId: ID, input: CreateOrderLineInput) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { lines: { productVariant: true } },
    });

    if (!order) {
      throw new UserInputError('Order not found');
    }

    const variant = await this.db.getRepository(VariantEntity).findOne({
      where: { id: input.productVariantId },
    });

    const variantInOrderLine = order.lines.find(
      (line) => line.productVariant.id === variant.id,
    );

    if (variantInOrderLine) {
      return this.updateLine(variantInOrderLine.id, {
        quantity: input.quantity + variantInOrderLine.quantity,
      });
    }

    if (variant.stock < input.quantity) {
      throw new ValidationError('Not enough stock');
    }

    const unitPrice = variant.price;
    const linePrice = unitPrice * input.quantity;

    const orderLine = this.db.getRepository(OrderLineEntity).create({
      productVariant: variant,
      quantity: input.quantity,
      unitPrice,
      linePrice,
      order,
    });

    await this.db.getRepository(OrderLineEntity).save(orderLine);

    return this.recalculateOrderStats(order.id);
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    const lineToUpdate = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: lineId },
      relations: { productVariant: true, order: true },
    });

    if (!lineToUpdate) {
      throw new UserInputError('Order line not found');
    }

    const variant = lineToUpdate.productVariant;

    if (input.quantity === 0) {
      return await this.removeLine(lineId);
    }

    if (variant.stock < input.quantity) {
      throw new ValidationError('Not enough stock');
    }

    const unitPrice = variant.price;
    const linePrice = unitPrice * input.quantity;

    await this.db.getRepository(OrderLineEntity).save({
      ...lineToUpdate,
      unitPrice,
      linePrice,
      quantity: input.quantity,
    });

    return this.recalculateOrderStats(lineToUpdate.order.id);
  }

  async removeLine(orderLineId: ID) {
    const orderLine = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: orderLineId },
      relations: { order: true },
    });

    if (!orderLine) {
      throw new UserInputError('Order line not found');
    }

    await this.db.getRepository(OrderLineEntity).delete(orderLine.id);

    return this.recalculateOrderStats(orderLine.order.id);
  }

  async addCustomer(orderId: ID, input: CreateCustomerInput) {
    if (!validateEmail(input.email)) {
      throw new UserInputError('Invalid email');
    }

    const customer = await this.db.getRepository(CustomerEntity).findOne({
      where: { email: input.email },
    });

    let customerUpdated = this.db.getRepository(CustomerEntity).create({
      ...customer,
      ...input,
    });
    customerUpdated = await this.db
      .getRepository(CustomerEntity)
      .save(customerUpdated);

    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
    });

    order.customer = customerUpdated;

    await this.db.getRepository(OrderEntity).save(order);

    return this.recalculateOrderStats(order.id);
  }

  async addShippingAddress(orderId: ID, input: CreateAddressInput) {
    const address = this.db.getRepository(AddressEntity).create(input);

    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
    });

    order.shippingAddress = address;

    await this.db.getRepository(OrderEntity).save(order);

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Apply price and quantity adjustments to the order after an update
   */
  private async recalculateOrderStats(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { lines: true },
    });

    const total = order.lines.reduce((acc, line) => acc + line.linePrice, 0);
    const subtotal = order.lines.reduce((acc, line) => acc + line.linePrice, 0);
    const totalQuantity = order.lines.reduce(
      (acc, line) => acc + line.quantity,
      0,
    );

    return await this.db.getRepository(OrderEntity).save({
      ...order,
      total,
      subtotal,
      totalQuantity,
    });
  }

  private async findById(id: ID) {
    return this.db.getRepository(OrderEntity).findOne({ where: { id } });
  }

  private async findByCode(code: string) {
    return this.db.getRepository(OrderEntity).findOne({ where: { code } });
  }
}
