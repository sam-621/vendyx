import { Column, JoinTable, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AssetInProductEntity } from './asset-on-product.entity';
import { CollectionEntity } from './collection.entity';
import { EBlocEntity } from './ebloc-entity';
import { VariantEntity } from './variant.entity';

@TypeOrmEntity('product')
export class ProductEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  /**
   * Determines if the product is exposes to storefront API or not
   */
  @Column('boolean', { default: true })
  published: boolean;

  /**
   * Determines if the product requires shipping or not
   */
  @Column('boolean', { default: false })
  onlineOnly: boolean;

  @OneToMany(() => VariantEntity, v => v.product)
  variants: VariantEntity[];

  @ManyToMany(() => CollectionEntity, c => c.products)
  @JoinTable({ name: 'product_on_collection' })
  collections: CollectionEntity[];

  @OneToMany(() => AssetInProductEntity, a => a.product)
  assetsInProduct: AssetInProductEntity[];
}
