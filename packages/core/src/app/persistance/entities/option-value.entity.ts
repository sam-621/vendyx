import {
  Column,
  ManyToMany,
  ManyToOne,
  Entity as TypeOrmEntity,
} from 'typeorm';

import { Entity } from './entity';
import { OptionEntity } from './option.entity';
import { VariantEntity } from './variant.entity';

@TypeOrmEntity('option_value')
export class OptionValueEntity extends Entity {
  @Column('varchar')
  value: string;

  @ManyToOne(() => OptionEntity, (o) => o.values)
  option: OptionEntity;

  @ManyToMany(() => VariantEntity, (v) => v.optionValues)
  variants: VariantEntity[];
}
