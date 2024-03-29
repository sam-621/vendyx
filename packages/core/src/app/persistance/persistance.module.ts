import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AdminEntity,
  AssetEntity,
  OptionEntity,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
} from './entities';

const ENTITIES = [
  AdminEntity,
  OptionEntity,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
  AssetEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5432/vendyx',
      // url: 'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway',
      entities: ENTITIES,
      // Indicates if database schema should be auto created on every application launch.
      synchronize: true,
    }),
  ],
})
export class PersistanceModule {}
