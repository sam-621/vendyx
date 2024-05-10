import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { PaymentEntity } from './payment.entity';

@TypeOrmEntity('payment_method')
export class PaymentMethodEntity extends Entity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  /**
   * Integration code is the code that is used to identify the payment integration.
   */
  @Column('varchar', { unique: true, name: 'integration_code' })
  integrationCode: string;

  @Column('boolean')
  enabled: boolean;

  @OneToMany(() => PaymentEntity, (p) => p.method)
  payments: PaymentEntity[];
}
