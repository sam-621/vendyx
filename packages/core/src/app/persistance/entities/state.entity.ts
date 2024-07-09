import { Column, ManyToMany, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { CountryEntity } from './country.entity';
import { EBlocEntity } from './ebloc-entity';
import { ShippingMethodEntity } from './shipping-method.entity';

@TypeOrmEntity('state')
export class StateEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @ManyToOne(() => CountryEntity, country => country.states)
  country: CountryEntity;

  @ManyToMany(() => ShippingMethodEntity, s => s.states)
  shippingMethods: ShippingMethodEntity[];
}
