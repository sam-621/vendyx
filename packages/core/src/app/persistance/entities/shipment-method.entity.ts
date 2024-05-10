import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { ShipmentEntity } from './shipment.entity';

@TypeOrmEntity('shipment_method')
export class ShipmentMethodEntity extends Entity {
  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  price: number;

  @Column('varchar')
  carrier: string;

  @Column('boolean')
  enabled: boolean;

  @OneToMany(() => ShipmentEntity, (p) => p.method)
  shipments: ShipmentEntity[];
}
