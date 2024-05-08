import { ValidationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderLineEntity)
    private orderLineRepository: Repository<OrderLineEntity>,
    @InjectRepository(VariantEntity)
    private variantRepository: Repository<VariantEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async find(input: ListInput) {
    return await this.orderRepository.find({
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
    const lines = await this.orderLineRepository.find({
      where: { order: { id: orderId } },
      order: { createdAt: 'DESC' },
    });

    return lines;
  }

  async findVariantInLine(orderLineId: ID) {
    const orderLine = await this.orderLineRepository.findOne({
      where: { id: orderLineId },
      relations: { productVariant: true },
    });

    return orderLine.productVariant;
  }

  async findCustomer(orderId: ID) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { customer: true },
    });

    return order.customer;
  }

  async findShippingAddress(orderId: ID) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    return order.shippingAddress;
  }

  async create() {
    const ordersCount = await this.orderRepository.count();
    const order = this.orderRepository.create({
      code: String(ordersCount + 1),
    });

    return await this.orderRepository.save(order);
  }

  async addLine(orderId: ID, input: CreateOrderLineInput) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { lines: { productVariant: true } },
    });

    if (!order) {
      throw new UserInputError('Order not found');
    }

    const variant = await this.variantRepository.findOne({
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

    const orderLine = this.orderLineRepository.create({
      productVariant: variant,
      quantity: input.quantity,
      unitPrice,
      linePrice,
      order,
    });

    await this.orderLineRepository.save(orderLine);

    return this.recalculateOrderStats(order.id);
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    const lineToUpdate = await this.orderLineRepository.findOne({
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

    await this.orderLineRepository.save({
      ...lineToUpdate,
      unitPrice,
      linePrice,
      quantity: input.quantity,
    });

    return this.recalculateOrderStats(lineToUpdate.order.id);
  }

  async removeLine(orderLineId: ID) {
    const orderLine = await this.orderLineRepository.findOne({
      where: { id: orderLineId },
      relations: { order: true },
    });

    if (!orderLine) {
      throw new UserInputError('Order line not found');
    }

    await this.orderLineRepository.delete(orderLine.id);

    return this.recalculateOrderStats(orderLine.order.id);
  }

  async addCustomer(orderId: ID, input: CreateCustomerInput) {
    let customer = await this.customerRepository.findOne({
      where: { email: input.email },
    });

    // TODO: Add this block to customer service
    if (!customer) {
      if (!validateEmail(input.email)) {
        throw new UserInputError('Invalid email');
      }

      customer = this.customerRepository.create(input);
      customer = await this.customerRepository.save(customer);
    }

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    order.customer = customer;

    await this.orderRepository.save(order);

    return this.recalculateOrderStats(order.id);
  }

  async addShippingAddress(orderId: ID, input: CreateAddressInput) {
    let address = await this.addressRepository.findOne({
      where: { postalCode: input.postalCode },
    });

    if (!address) {
      address = this.addressRepository.create(input);
      address = await this.addressRepository.save(address);
    }

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    order.shippingAddress = address;

    await this.orderRepository.save(order);

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Apply price and quantity adjustments to the order after an update
   */
  private async recalculateOrderStats(orderId: ID) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { lines: true },
    });

    const total = order.lines.reduce((acc, line) => acc + line.linePrice, 0);
    const subtotal = order.lines.reduce((acc, line) => acc + line.linePrice, 0);
    const totalQuantity = order.lines.reduce(
      (acc, line) => acc + line.quantity,
      0,
    );

    return await this.orderRepository.save({
      ...order,
      total,
      subtotal,
      totalQuantity,
    });
  }

  private async findById(id: ID) {
    return this.orderRepository.findOne({ where: { id } });
  }

  private async findByCode(code: string) {
    return this.orderRepository.findOne({ where: { code } });
  }
}
