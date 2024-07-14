import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { ConfigurableProperty, EBlocEntity } from './ebloc-entity';
import { ZoneEntity } from './zone.entity';

@TypeOrmEntity('shipping_method')
export class ShippingMethodEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('simple-json', { name: 'price_calculator' })
  priceCalculator: ConfigurableProperty;

  @Column('boolean', { default: true })
  enabled: boolean;

  // If a zone is deleted, all its shipping methods will be deleted
  @ManyToOne(() => ZoneEntity, z => z.shippingMethods, { onDelete: 'CASCADE' })
  zone: ZoneEntity;
}
