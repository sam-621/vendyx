import { Column, ManyToMany, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { OptionEntity } from './option.entity';
import { VariantEntity } from './variant.entity';

@TypeOrmEntity('option_value')
export class OptionValueEntity extends EBlocEntity {
  @Column('varchar')
  value: string;

  @ManyToOne(() => OptionEntity, o => o.values)
  option: OptionEntity;

  @ManyToMany(() => VariantEntity, v => v.optionValues)
  variants: VariantEntity[];
}
