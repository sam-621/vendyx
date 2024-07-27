import { Column, ManyToOne, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { OptionValueEntity } from './option-value.entity';
import { ProductEntity } from './product.entity';

@TypeOrmEntity('option')
export class OptionEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @ManyToOne(() => ProductEntity, p => p.options)
  product: ProductEntity;

  @OneToMany(() => OptionValueEntity, v => v.option)
  values: OptionValueEntity[];
}
