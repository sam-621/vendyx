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

@TypeOrmEntity('variant')
export class VariantEntity extends EBlocEntity {
  @Column('int')
  price: number;

  @Column('int', { name: 'comparison_price', nullable: true })
  comparisonPrice: number;

  @Column('int', { name: 'cost_per_unit', nullable: true })
  costPerUnit: number;

  @Column('int')
  stock: number;

  @Column('varchar')
  sku: string;

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
