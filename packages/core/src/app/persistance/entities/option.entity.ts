import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OptionValueEntity } from './option-value.entity';

@TypeOrmEntity('option')
export class OptionEntity extends Entity {
  @Column('varchar')
  name: string;

  @OneToMany(() => OptionValueEntity, (v) => v.option)
  values: OptionValueEntity[];
}
