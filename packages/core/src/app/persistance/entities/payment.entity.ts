import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('payment')
export class PaymentEntity extends EBlocEntity {
  /**
   * The transaction id of the payment. Is nullable because the payment might not have been processed yet.
   */
  @Column('varchar', { name: 'transaction_id', nullable: true })
  transactionId: string;

  /**
   * The total amount of the payment
   */
  @Column('int')
  amount: number;

  /**
   * The Payment method name used for the payment
   */
  @Column('varchar')
  method: string;
}
