import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('payment_method')
export class PaymentMethodEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  /**
   * Integration code is the code that is used to identify the payment integration.
   */
  @Column('varchar', { unique: true, name: 'integration_code' })
  integrationCode: string;

  @Column('boolean', { default: true })
  enabled: boolean;
}
