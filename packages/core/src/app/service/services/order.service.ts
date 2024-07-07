import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Not } from 'typeorm';

import { ErrorResult, ValidOrderTransitions, validateEmail } from '../utils';

import {
  AddCustomerToOrderInput,
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateOrderLineInput,
  ListInput,
  MarkOrderAsShippedInput,
  OrderErrorCode,
  UpdateOrderLineInput
} from '@/app/api/common';
import { getConfig } from '@/app/config';
import { OrderEvent } from '@/app/events';
import {
  AddressEntity,
  CustomerEntity,
  ID,
  OrderEntity,
  OrderLineEntity,
  OrderState,
  PaymentEntity,
  PaymentMethodEntity,
  ShipmentEntity,
  ShippingMethodEntity,
  VariantEntity
} from '@/app/persistance';

@Injectable()
export class OrderService {
  constructor(@InjectDataSource() private db: DataSource, private eventEmitter: EventEmitter2) {}

  async find(input: ListInput) {
    return await this.db.getRepository(OrderEntity).find({
      skip: input?.skip ?? undefined,
      take: input?.take ?? undefined,
      order: { createdAt: 'DESC' },
      where: { state: Not(OrderState.MODIFYING) }
    });
  }

  async findUnique(id: ID, code: string) {
    if (id) {
      return this.findById(id);
    }

    if (code) {
      return this.findByCode(code);
    }

    return null;
  }

  async findLines(orderId: ID) {
    const lines = await this.db.getRepository(OrderLineEntity).find({
      where: { order: { id: orderId } },
      order: { createdAt: 'ASC' }
    });

    return lines;
  }

  async findVariantInLine(orderLineId: ID) {
    const orderLine = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: orderLineId },
      relations: { productVariant: true },
      withDeleted: true
    });

    return orderLine?.productVariant;
  }

  async findCustomer(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { customer: true }
    });

    return order?.customer;
  }

  async findShippingAddress(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId }
    });

    if (!order?.shippingAddress) {
      return null;
    }

    // The shipping address could be a json or a Address entity, so we need to normalize it
    return { id: '', createdAt: '', updatedAt: '', ...order.shippingAddress };
  }

  async findPayment(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { payment: true }
    });

    return order?.payment;
  }

  async findShipment(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { shipment: true }
    });

    return order?.shipment;
  }

  /**
   * Creates an empty order
   * @returns Error Result or created order
   */
  async create() {
    const ordersCount = await this.db.getRepository(OrderEntity).count();
    const order = this.db.getRepository(OrderEntity).create({
      code: String(ordersCount + 1000)
    });

    return await this.db.getRepository(OrderEntity).save(order);
  }

  /**
   * Add line to order
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order is in the MODIFYING state
   * 3. If variant is in an order line in the order, update the line quantity
   * 4. If the input quantity is greater than the variant stock, return an NOT ENOUGH STOCK error
   * 5. Create order line
   * 6. Recalculate order stats
   */
  async addLine(
    orderId: ID,
    input: CreateOrderLineInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { lines: { productVariant: true } }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found with the given id');
    }

    if (order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to add line to order in state ${order.state}`
      );
    }

    const variant = await this.db.getRepository(VariantEntity).findOne({
      where: { id: input.productVariantId }
    });

    if (!variant) {
      return new ErrorResult(OrderErrorCode.VARIANT_NOT_FOUND, 'Variant not found');
    }

    const variantInOrderLine = order.lines.find(line => line.productVariant.id === variant.id);

    if (variantInOrderLine) {
      return this.updateLine(variantInOrderLine.id, {
        quantity: input.quantity + variantInOrderLine.quantity
      });
    }

    if (variant.stock < input.quantity) {
      return new ErrorResult(OrderErrorCode.NOT_ENOUGH_STOCK, 'Not enough stock');
    }

    const unitPrice = variant.price;
    const linePrice = unitPrice * input.quantity;

    const orderLine = this.db.getRepository(OrderLineEntity).create({
      productVariant: variant,
      quantity: input.quantity,
      unitPrice,
      linePrice,
      order
    });

    await this.db.getRepository(OrderLineEntity).save(orderLine);

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Updates line
   *
   * @description
   * 1. Check if the line exists
   * 2. Check if the order is in the MODIFYING state
   * 3. If the input quantity is 0, remove the line
   * 4. If the input quantity is greater than the variant stock, return an NOT ENOUGH STOCK error
   * 5. Update the line
   * 6. Recalculate order stats
   */
  async updateLine(
    lineId: ID,
    input: UpdateOrderLineInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const lineToUpdate = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: lineId },
      relations: { productVariant: true, order: true }
    });

    if (!lineToUpdate) {
      return new ErrorResult(OrderErrorCode.LINE_NOT_FOUND, 'line not found');
    }

    if (lineToUpdate.order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to update line to order in state ${lineToUpdate.order.state}`
      );
    }

    const variant = lineToUpdate.productVariant;

    if (input.quantity === 0) {
      return await this.removeLine(lineId);
    }

    if (variant.stock < input.quantity) {
      return new ErrorResult(OrderErrorCode.NOT_ENOUGH_STOCK, 'Not enough stock');
    }

    const unitPrice = variant.price;
    const linePrice = unitPrice * input.quantity;

    await this.db.getRepository(OrderLineEntity).save({
      ...lineToUpdate,
      unitPrice,
      linePrice,
      quantity: input.quantity
    });

    return this.recalculateOrderStats(lineToUpdate.order.id);
  }

  /**
   * Remove line from order
   *
   * @description
   * 1. Check if the line exists
   * 2. Check if the order is in the MODIFYING state
   * 3. Remove the line
   * 4. Recalculate order stats
   */
  async removeLine(orderLineId: ID): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const orderLine = await this.db.getRepository(OrderLineEntity).findOne({
      where: { id: orderLineId },
      relations: { order: true }
    });

    if (!orderLine) {
      return new ErrorResult(OrderErrorCode.LINE_NOT_FOUND, 'Line not found');
    }

    if (orderLine.order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to remove line to order in state ${orderLine.order.state}`
      );
    }

    await this.db.getRepository(OrderLineEntity).delete(orderLine.id);

    return this.recalculateOrderStats(orderLine.order.id);
  }

  /**
   * Add customer to order
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order is in the MODIFYING state
   * 3. Save customer
   * 4. Update order with customer
   * 5. Recalculate order stats
   */
  async addCustomer(
    orderId: ID,
    input: AddCustomerToOrderInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    if (!validateEmail(input.email)) {
      return new ErrorResult(OrderErrorCode.CUSTOMER_INVALID_EMAIL, 'Invalid email');
    }

    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to add customer to order in state ${order.state}`
      );
    }

    const customer = await this.db.getRepository(CustomerEntity).findOne({
      where: { email: input.email }
    });

    if (customer?.enabled === false) {
      return new ErrorResult(OrderErrorCode.CUSTOMER_DISABLED, 'Customer is disabled');
    }

    let customerUpdated = this.db.getRepository(CustomerEntity).create({
      ...customer,
      ...clean(input)
    });

    customerUpdated = await this.db.getRepository(CustomerEntity).save(customerUpdated);

    order.customer = customerUpdated;

    await this.db.getRepository(OrderEntity).save(order);

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Add shipping address to order
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order is in the MODIFYING state
   * 4. Update order with address in JSON
   * 5. Recalculate order stats
   */
  async addShippingAddress(
    orderId: ID,
    input: CreateAddressInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to add shipping address to order in state ${order.state}`
      );
    }

    const address = this.db.getRepository(AddressEntity).create(clean(input));

    order.shippingAddress = address;

    await this.db.getRepository(OrderEntity).save(order);

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Add shipment to order using the shipment method specified
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order is in the MODIFYING state
   * 3. Check if the shipping method exists
   * 4. Calculate the shipping price
   * 5. Save shipment
   * 6. Update order with shipment
   * 7. Recalculate order stats
   */
  async addShipment(
    orderId: ID,
    input: AddShipmentToOrderInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { lines: true, customer: true }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (!order.shippingAddress) {
      return new ErrorResult(OrderErrorCode.MISSING_SHIPPING_ADDRESS, 'Missing shipping address');
    }

    if (order.state !== OrderState.MODIFYING) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to add shipment to order in state ${order.state}`
      );
    }

    const shippingMethod = await this.db
      .getRepository(ShippingMethodEntity)
      .findOne({ where: { id: input.shippingMethodId } });

    if (!shippingMethod) {
      return new ErrorResult(OrderErrorCode.SHIPPING_METHOD_NOT_FOUND, `Shipping method not found`);
    }

    // TODO: Do I have to validate if calculator exists?
    const shippingPriceCalculator = getConfig().shipping.priceCalculators.find(
      p => p.code === shippingMethod.priceCalculatorCode
    );

    if (!shippingPriceCalculator) {
      return new ErrorResult(
        OrderErrorCode.MISSING_SHIPPING_PRICE_CALCULATOR,
        'Missing shipping price calculator'
      );
    }

    const shippingPrice = await shippingPriceCalculator.calculatePrice(order);

    const shipment = await this.db.getRepository(ShipmentEntity).save({
      amount: shippingPrice,
      method: shippingMethod
    });

    await this.db.getRepository(OrderEntity).save({
      ...order,
      shipment
    });

    return this.recalculateOrderStats(order.id);
  }

  /**
   * Add payment to order using the payment method specified
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order can be transitioned to the PAYMENT_ADDED state
   * 3. Check if the payment method exists
   * 4. Create payment using the payment method integration
   * 5. If the payment is declined, return a PAYMENT_DECLINED error
   * 6. If the payment is created, save the payment and update the order state to PAYMENT_ADDED
   * 7. If the payment is authorized, save the payment and update the order state to PAYMENT_AUTHORIZED
   * 8. Update the variant stock
   * 9. Recalculate order stats
   */
  async addPayment(
    orderId: ID,
    input: AddPaymentToOrderInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { customer: true, lines: { productVariant: true } }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.PAYMENT_ADDED))) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to add payment to order in state ${order.state}`
      );
    }

    const paymentMethod = await this.db.getRepository(PaymentMethodEntity).findOne({
      where: { id: input.methodId }
    });

    if (!paymentMethod) {
      return new ErrorResult(OrderErrorCode.PAYMENT_METHOD_NOT_FOUND, 'Payment method not found');
    }

    const paymentIntegration = getConfig().payments.integrations.find(
      p => p.code === paymentMethod.integrationCode
    );

    const paymentIntegrationResult = await paymentIntegration?.createPayment(order);

    if (!paymentIntegrationResult) {
      return new ErrorResult(
        OrderErrorCode.MISSING_PAYMENT_INTEGRATION,
        'No payment integration found for the given payment method'
      );
    }

    // TODO: do something with paymentIntegrationResult.error
    if (paymentIntegrationResult.status === 'declined') {
      return new ErrorResult(OrderErrorCode.PAYMENT_DECLINED, 'Payment declined');
    }

    let orderToReturn = order;

    if (paymentIntegrationResult.status === 'created') {
      const payment = await this.db.getRepository(PaymentEntity).save({
        amount: order.total,
        method: paymentMethod
      });

      orderToReturn = await this.db.getRepository(OrderEntity).save({
        ...order,
        payment,
        state: OrderState.PAYMENT_ADDED,
        placedAt: new Date()
      });
    }

    if (paymentIntegrationResult.status === 'authorized') {
      const payment = await this.db.getRepository(PaymentEntity).save({
        amount: paymentIntegrationResult.amount,
        method: paymentMethod,
        transactionId: paymentIntegrationResult.transactionId
      });

      orderToReturn = await this.db.getRepository(OrderEntity).save({
        ...order,
        payment,
        state: OrderState.PAYMENT_AUTHORIZED,
        placedAt: new Date()
      });
    }

    await this.db.getRepository(VariantEntity).save(
      order.lines.map(l => ({
        ...l.productVariant,
        stock: l.productVariant.stock - l.quantity
      }))
    );

    this.eventEmitter.emit(OrderEvent.PAID, { orderId: order.id });

    return orderToReturn;
  }

  /**
   * Mark order as shipped
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order can be transitioned to the SHIPPED state
   * 3. Save the shipment with the tracking code, carrier and state SHIPPED
   */
  async markAsShipped(
    orderId: ID,
    input: MarkOrderAsShippedInput
  ): Promise<ErrorResult<OrderErrorCode> | OrderEntity> {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { shipment: true }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.SHIPPED))) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to transition order to state ${order.state}`
      );
    }

    const shipmentToUpdate = await this.db.getRepository(ShipmentEntity).save({
      ...order.shipment,
      trackingCode: input.trackingCode,
      carrier: input.carrier
    });

    this.eventEmitter.emit(OrderEvent.SHIPPED, { orderId: order.id });

    return await this.db.getRepository(OrderEntity).save({
      ...order,
      state: OrderState.SHIPPED,
      shipment: shipmentToUpdate
    });
  }

  /**
   * Mark order as delivered and complete it
   *
   * @description
   * 1. Check if the order exists
   * 2. Check if the order can be transitioned to the DELIVERED state
   * 3. Update the order state to DELIVERED
   */
  async markAsDelivered(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId }
    });

    if (!order) {
      return new ErrorResult(OrderErrorCode.ORDER_NOT_FOUND, 'Order not found');
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.DELIVERED))) {
      return new ErrorResult(
        OrderErrorCode.ORDER_TRANSITION_ERROR,
        `Unable to transition order to state ${OrderState.DELIVERED}`
      );
    }

    this.eventEmitter.emit(OrderEvent.DELIVERED, { orderId: order.id });

    return await this.db.getRepository(OrderEntity).save({
      ...order,
      state: OrderState.DELIVERED
    });
  }

  /**
   * Validate if the order can transition to the new state
   */
  private async validateOrderTransitionState(order: OrderEntity, state: OrderState) {
    const prevState = order.state;
    const nextState = state;

    const transitionStateAllowed = ValidOrderTransitions.some(
      t => t[0] === prevState && t[1] === nextState
    );

    if (!transitionStateAllowed) {
      return false;
    }

    if (nextState === OrderState.PAYMENT_ADDED || nextState === OrderState.PAYMENT_AUTHORIZED) {
      const orderToVerify = await this.db.getRepository(OrderEntity).findOne({
        where: { id: order.id },
        relations: { customer: true, shipment: true }
      });

      if (!orderToVerify?.customer || !orderToVerify?.shipment) {
        return false;
      }
    }

    return transitionStateAllowed;
  }

  /**
   * Apply price and quantity adjustments to the order after an update
   */
  private async recalculateOrderStats(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({
      where: { id: orderId },
      relations: { lines: true, shipment: true }
    });

    const subtotal = order?.lines.reduce((acc, line) => acc + line.linePrice, 0) ?? 0;
    const total = subtotal + (order?.shipment?.amount ?? 0);
    const totalQuantity = order?.lines.reduce((acc, line) => acc + line.quantity, 0);

    return await this.db.getRepository(OrderEntity).save({
      ...order,
      total,
      subtotal,
      totalQuantity
    });
  }

  private async findById(id: ID) {
    return this.db.getRepository(OrderEntity).findOne({ where: { id } });
  }

  private async findByCode(code: string) {
    return this.db.getRepository(OrderEntity).findOne({ where: { code } });
  }
}
