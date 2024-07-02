import { Column, ManyToOne, PrimaryColumn, Entity as TypeOrmEntity } from 'typeorm';

import { AssetEntity } from './asset.entity';
import { ProductEntity } from './product.entity';

@TypeOrmEntity('asset_in_product')
export class AssetInProductEntity {
  @PrimaryColumn()
  public asset_in_product: string;

  @Column()
  public order: number;

  @ManyToOne(() => ProductEntity, product => product.assetsInProduct)
  public product: ProductEntity;

  @ManyToOne(() => AssetEntity, asset => asset.assetsInProduct)
  public asset: AssetEntity;
}
