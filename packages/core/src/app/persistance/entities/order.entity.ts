import {
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  Entity as TypeOrmEntity,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { CustomerEntity } from './customer.entity';
import { Entity } from './entity';
import { OrderLineEntity } from './order-line.entity';
import { PaymentEntity } from './payment.entity';
import { ShipmentEntity } from './shipment.entity';

export enum OrderState {
  MODIFYING = 'MODIFYING',
  PAYMENT_ADDED = 'PAYMENT_ADDED',
  PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

@TypeOrmEntity('order')
export class OrderEntity extends Entity {
  @Column('int', { generated: 'increment' })
  code: number;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.MODIFYING,
  })
  state: OrderState;

  /**
   * The price that will be sent to the payment provider. subtotal plus shipping price
   */
  @Column('int', { default: 0 })
  total: number;

  /**
   * Order lines total less discounts
   */
  @Column('int', { default: 0 })
  subtotal: number;

  /**
   * The date and time when a payment has been added to the order
   */
  @Column('date', { nullable: true, name: 'placed_at' })
  placedAt: Date;

  @Column('int', { default: 0 })
  totalQuantity: number;

  @Column('simple-json', { nullable: true, name: 'shipping_address' })
  shippingAddress: AddressEntity;

  @OneToMany(() => OrderLineEntity, (l) => l.order)
  lines: OrderLineEntity[];

  @ManyToOne(() => CustomerEntity, (c) => c.orders, { nullable: true })
  customer: CustomerEntity;

  @OneToOne(() => PaymentEntity, (p) => p.order, { nullable: true })
  payment: PaymentEntity;

  @OneToOne(() => ShipmentEntity, (s) => s.order, { nullable: true })
  shipment: ShipmentEntity;
}
