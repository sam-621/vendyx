import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Entity as TypeOrmEntity
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { CustomerEntity } from './customer.entity';
import { EBlocEntity } from './ebloc-entity';
import { OrderLineEntity } from './order-line.entity';
import { PaymentEntity } from './payment.entity';
import { ShipmentEntity } from './shipment.entity';

export enum OrderState {
  /**
   * The order is being modified by the customer (CRUD line actions, adding contact info and shipment info)
   */
  MODIFYING = 'MODIFYING',
  /**
   * The order is ready to be paid
   */
  PAYMENT_ADDED = 'PAYMENT_ADDED',
  /**
   * The payment has been authorized by the payment provider
   */
  PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
  /**
   * The order has been shipped (carrier and tracking code added)
   */
  SHIPPED = 'SHIPPED',
  /**
   * The order has been delivered and is completes
   */
  DELIVERED = 'DELIVERED'
}

@TypeOrmEntity('orders')
export class OrderEntity extends EBlocEntity {
  @Column('varchar')
  code: string;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.MODIFYING
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
  shippingAddress: Omit<AddressEntity, 'id' | 'createdAt' | 'updatedAt'>;

  @OneToMany(() => OrderLineEntity, l => l.order)
  lines: OrderLineEntity[];

  @ManyToOne(() => CustomerEntity, c => c.orders, { nullable: true })
  customer: CustomerEntity;

  @JoinColumn()
  @OneToOne(() => PaymentEntity, { nullable: true })
  payment: PaymentEntity;

  @JoinColumn()
  @OneToOne(() => ShipmentEntity, { nullable: true })
  shipment: ShipmentEntity;
}
