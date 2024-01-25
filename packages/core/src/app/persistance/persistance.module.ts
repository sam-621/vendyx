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

export const ENTITIES = [
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
      entities: ENTITIES,
      // Indicates if database schema should be auto created on every application launch.
      synchronize: true,
    }),
  ],
})
export class PersistanceModule {}
