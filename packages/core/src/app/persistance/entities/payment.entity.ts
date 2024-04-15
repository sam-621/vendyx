import { Column, ManyToOne, OneToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OrderEntity } from './order.entity';
import { PaymentMethodEntity } from './payment-method.entity';

@TypeOrmEntity('payment')
export class PaymentEntity extends Entity {
  @Column('varchar', { name: 'transaction_id' })
  transactionId: string;

  @Column('int')
  amount: number;

  @OneToOne(() => OrderEntity, (o) => o.payment)
  order: OrderEntity;

  @ManyToOne(() => PaymentMethodEntity, (m) => m.payments)
  method: PaymentMethodEntity;
}
