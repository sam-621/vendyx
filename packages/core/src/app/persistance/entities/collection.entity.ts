import { Column, JoinTable, ManyToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AssetEntity } from './asset.entity';
import { EBlocEntity } from './ebloc-entity';
import { ProductEntity } from './product.entity';

@TypeOrmEntity('collection')
export class CollectionEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('boolean', { default: true })
  published: boolean;

  @ManyToMany(() => ProductEntity, p => p.collections)
  products: ProductEntity[];

  @ManyToMany(() => AssetEntity, a => a.collections)
  @JoinTable({ name: 'asset_on_collection' })
  assets: AssetEntity[];
}
