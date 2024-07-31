import { Column, JoinTable, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AssetInProductEntity } from './asset-on-product.entity';
import { CollectionEntity } from './collection.entity';
import { EBlocEntity } from './ebloc-entity';
import { OptionEntity } from './option.entity';
import { VariantEntity } from './variant.entity';

/**
 * @description
 * A product is a good or service that you want to sell.
 */
@TypeOrmEntity('product')
export class ProductEntity extends EBlocEntity {
  /**
   * The product's name
   */
  @Column('varchar')
  name: string;

  /**
   * A human-friendly unique string for the Product automatically generated from its name
   */
  @Column('varchar', { unique: true })
  slug: string;

  /**
   * The product's description
   */
  @Column('text', { nullable: true })
  description: string;

  /**
   * Whether the products is enabled or not.
   * Not enabled products are not exposed to the storefront API but are visible in the admin ui.
   * Useful for products that are not published by now but they planned to be published in the future.
   */
  @Column('boolean', { default: true })
  enabled: boolean;

  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  @Column('boolean', { default: false })
  archived: boolean;

  @OneToMany(() => VariantEntity, v => v.product)
  variants: VariantEntity[];

  @OneToMany(() => OptionEntity, o => o.product)
  options: OptionEntity[];

  @ManyToMany(() => CollectionEntity, c => c.products)
  @JoinTable({ name: 'product_in_collection' })
  collections: CollectionEntity[];

  @OneToMany(() => AssetInProductEntity, a => a.product)
  assetsInProduct: AssetInProductEntity[];
}
