import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { ShippingMethodEntity } from './shipping-method.entity';

@TypeOrmEntity('shipment')
export class ShipmentEntity extends Entity {
  @Column('varchar', { name: 'tracking_code', nullable: true })
  trackingCode: string;

  @Column('varchar', { nullable: true })
  carrier: string;

  @Column('int')
  amount: number;

  @ManyToOne(() => ShippingMethodEntity, s => s.shipments)
  method: ShippingMethodEntity;
}
