import { Column, ManyToMany, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { CountryEntity } from './country.entity';
import { EBlocEntity } from './ebloc-entity';
import { ShippingMethodEntity } from './shipping-method.entity';

@TypeOrmEntity('state')
export class StateEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;

  @ManyToOne(() => CountryEntity, country => country.states, { onDelete: 'CASCADE' }) // If a country is deleted, all its states will be deleted
  country: CountryEntity;

  @ManyToMany(() => ShippingMethodEntity, s => s.states)
  shippingMethods: ShippingMethodEntity[];
}
