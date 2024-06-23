import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { OptionValueEntity } from './option-value.entity';

@TypeOrmEntity('option')
export class OptionEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => OptionValueEntity, v => v.option)
  values: OptionValueEntity[];
}
