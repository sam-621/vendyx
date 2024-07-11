import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';

@TypeOrmEntity('country')
export class CountryEntity extends EBlocEntity {
  @Column('varchar', { unique: true })
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;
}
