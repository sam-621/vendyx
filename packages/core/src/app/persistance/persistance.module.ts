import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AddressEntity,
  AdminEntity,
  AssetEntity,
  CustomerEntity,
  OptionEntity,
  OptionValueEntity,
  OrderEntity,
  OrderLineEntity,
  PaymentEntity,
  PaymentMethodEntity,
  ProductEntity,
  ShipmentEntity,
  ShipmentMethodEntity,
  VariantEntity,
} from './entities';
import { getConfig } from '../config';

export const ENTITIES = [
  AdminEntity,
  OptionEntity,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
  AssetEntity,
  AddressEntity,
  CustomerEntity,
  OrderEntity,
  OrderLineEntity,
  PaymentEntity,
  ShipmentEntity,
  PaymentMethodEntity,
  ShipmentMethodEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const { url } = getConfig().db;

        return {
          type: 'postgres',
          url: url,
          entities: ENTITIES,
          // Indicates if database schema should be auto created on every application launch.
          synchronize: true,
        };
      },
    }),
  ],
})
export class PersistanceModule {}
