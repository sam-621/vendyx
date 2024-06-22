import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { ShipmentEntity } from './shipment.entity';

@TypeOrmEntity('shipping_method')
export class ShippingMethodEntity extends Entity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { name: 'price_calculator_code' })
  priceCalculatorCode: string;

  @Column('boolean')
  enabled: boolean;

  @OneToMany(() => ShipmentEntity, p => p.method)
  shipments: ShipmentEntity[];
}
