import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { StateEntity } from './state.entity';

@TypeOrmEntity('country')
export class CountryEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => StateEntity, state => state.country)
  states: StateEntity[];
}
