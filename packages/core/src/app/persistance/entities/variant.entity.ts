import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Entity as TypeOrmEntity,
} from 'typeorm';

import { Entity } from './entity';
import { OptionValueEntity } from './option-value.entity';
import { ProductEntity } from './product.entity';

@TypeOrmEntity('variant')
export class VariantEntity extends Entity {
  @Column('varchar', { unique: true })
  sku: string;

  @Column('int')
  price: number;

  @Column('int')
  stock: number;

  /**
   * Determines if the product is exposes to shop API or not
   */
  @Column('boolean', { default: true })
  published: boolean;

  @ManyToOne(() => ProductEntity, (p) => p.variants)
  product: ProductEntity;

  @ManyToMany(() => OptionValueEntity, (ov) => ov.variants)
  @JoinTable({ name: 'option_value_on_variant' })
  optionValues: OptionValueEntity[];
}
