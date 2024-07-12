import { Column, ManyToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { ZoneEntity } from './zone.entity';

@TypeOrmEntity('country')
export class CountryEntity extends EBlocEntity {
  @Column('varchar', { unique: true })
  name: string;

  @Column('boolean', { default: true })
  enabled: boolean;

  @ManyToMany(() => ZoneEntity, z => z.countries)
  zones: ZoneEntity[];
}
