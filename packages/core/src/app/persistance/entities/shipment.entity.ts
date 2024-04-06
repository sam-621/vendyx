import { Column, OneToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OrderEntity } from './order.entity';

@TypeOrmEntity('shipment')
export class ShipmentEntity extends Entity {
  @Column('varchar', { name: 'tracking_code' })
  trackingCode: string;

  @Column('int')
  amount: number;

  @OneToOne(() => OrderEntity, (o) => o.shipment)
  order: OrderEntity;
}
