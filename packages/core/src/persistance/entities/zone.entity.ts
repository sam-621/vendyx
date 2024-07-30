import { Column, JoinTable, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { CountryEntity } from './country.entity';
import { EBlocEntity } from './ebloc-entity';
import { ShippingMethodEntity } from './shipping-method.entity';

@TypeOrmEntity('zone')
export class ZoneEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @ManyToMany(() => CountryEntity, c => c.zones)
  @JoinTable({ name: 'country_in_zone' })
  countries: CountryEntity[];

  @OneToMany(() => ShippingMethodEntity, s => s.zone)
  shippingMethods: ShippingMethodEntity[];
}
