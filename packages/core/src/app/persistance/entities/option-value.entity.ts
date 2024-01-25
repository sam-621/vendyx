import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OptionEntity } from './option.entity';

@TypeOrmEntity('option_value')
export class OptionValueEntity extends Entity {
  @Column('varchar')
  value: string;

  @ManyToOne(() => OptionEntity, (o) => o.values)
  option: OptionEntity;
}
