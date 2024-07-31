import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Entity as TypeOrmEntity
} from 'typeorm';

import { AssetEntity } from './asset.entity';
import { EBlocEntity } from './ebloc-entity';
import { OptionValueEntity } from './option-value.entity';
import { OrderLineEntity } from './order-line.entity';
import { ProductEntity } from './product.entity';

/**
 * @description
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
@TypeOrmEntity('variant')
export class VariantEntity extends EBlocEntity {
  /**
   * The variant's sale price
   */
  @Column('int')
  price: number;

  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  @Column('int', { name: 'comparison_price', nullable: true })
  comparisonPrice: number;

  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  @Column('int', { name: 'cost_per_unit', nullable: true })
  costPerUnit: number;

  /**
   * The variant's stock
   */
  @Column('int')
  stock: number;

  /**
   * The variant's SKU
   */
  @Column('varchar')
  sku: string;

  /**
   * The variant's weight
   * Useful when you want to indicate that the variant needs shipping.
   */
  @Column('int')
  weight: number;

  @JoinColumn()
  @OneToOne(() => AssetEntity, { nullable: true })
  asset: AssetEntity;

  @ManyToOne(() => ProductEntity, p => p.variants)
  product: ProductEntity;

  @ManyToMany(() => OptionValueEntity, ov => ov.variants)
  @JoinTable({ name: 'option_value_on_variant' })
  optionValues: OptionValueEntity[];

  @OneToMany(() => OrderLineEntity, l => l.productVariant)
  orderLines: OrderLineEntity[];
}
