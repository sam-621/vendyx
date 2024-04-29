import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { PaymentEntity } from './payment.entity';

@TypeOrmEntity('payment-method')
export class PaymentMethodEntity extends Entity {
  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column('boolean')
  enabled: boolean;

  @OneToMany(() => PaymentEntity, (p) => p.method)
  payments: PaymentEntity[];
}