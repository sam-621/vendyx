import { Column, JoinTable, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AssetEntity } from './asset.entity';
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
  @Column('boolean')
  published: boolean;

  /**
   * Determines if the product requires shipping or not
   */
  @Column('boolean')
  onlineOnly: boolean;

  @OneToMany(() => VariantEntity, v => v.product)
  variants: VariantEntity[];

  @ManyToMany(() => AssetEntity, a => a.products)
  @JoinTable({ name: 'asset_on_product' })
  assets: AssetEntity[];
}
