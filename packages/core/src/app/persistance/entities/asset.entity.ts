import { Column, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';

enum AssetType {
  IMAGE = 'IMAGE',
}

@TypeOrmEntity('asset')
export class AssetEntity extends Entity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  source: string;

  @Column({
    type: 'enum',
    enum: AssetType,
    default: AssetType.IMAGE,
  })
  type: string;
}
