import { Column, ManyToMany, OneToMany, Entity as TypeOrmEntity } from 'typeorm';

import { AssetInProductEntity } from './asset-on-product.entity';
import { CollectionEntity } from './collection.entity';
import { EBlocEntity } from './ebloc-entity';

export enum AssetType {
  IMAGE = 'IMAGE'
}

@TypeOrmEntity('asset')
export class AssetEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  source: string;

  @Column({
    type: 'enum',
    enum: AssetType,
    default: AssetType.IMAGE
  })
  type: string;

  @OneToMany(() => AssetInProductEntity, e => e.asset)
  assetsInProduct: AssetInProductEntity[];

  @ManyToMany(() => CollectionEntity, c => c.assets)
  collections: CollectionEntity[];
}
