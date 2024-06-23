import { Column, ManyToMany, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { ProductEntity } from './product.entity';

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

  @ManyToMany(() => ProductEntity, p => p.assets)
  products: ProductEntity[];
}
