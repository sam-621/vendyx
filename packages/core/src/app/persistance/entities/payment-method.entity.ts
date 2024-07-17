import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { ConfigurableProperty, EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('payment_method')
export class PaymentMethodEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  /**
   * Integration code is the code that is used to identify the payment integration.
   */
  @Column('simple-json', { name: 'handler' })
  handler: ConfigurableProperty;

  @Column('boolean', { default: true })
  enabled: boolean;
}
