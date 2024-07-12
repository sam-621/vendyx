import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('shipment')
export class ShipmentEntity extends EBlocEntity {
  @Column('varchar', { name: 'tracking_code', nullable: true })
  trackingCode: string;

  @Column('varchar', { nullable: true })
  carrier: string;

  @Column('int')
  amount: number;

  /**
   * The Shipping method name used for the shipment
   */
  @Column('varchar')
  method: string;
}
