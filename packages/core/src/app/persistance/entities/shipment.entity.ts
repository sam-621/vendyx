import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { ShippingMethodEntity } from './shipping-method.entity';

@TypeOrmEntity('shipment')
export class ShipmentEntity extends EBlocEntity {
  @Column('varchar', { name: 'tracking_code', nullable: true })
  trackingCode: string;

  @Column('varchar', { nullable: true })
  carrier: string;

  @Column('int')
  amount: number;

  @ManyToOne(() => ShippingMethodEntity, s => s.shipments)
  method: ShippingMethodEntity;
}
