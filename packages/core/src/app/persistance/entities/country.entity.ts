import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { StateEntity } from './state.entity';

@TypeOrmEntity('country')
export class CountryEntity extends EBlocEntity {
  @Column('varchar', { unique: true })
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;

  @OneToMany(() => StateEntity, state => state.country, { cascade: true })
  states: StateEntity[];
}
