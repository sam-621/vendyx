import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AddressEntity,
  AdminEntity,
  AssetEntity,
  AssetInProductEntity,
  CollectionEntity,
  CountryEntity,
  CustomerEntity,
  OptionEntity,
  OptionValueEntity,
  OrderEntity,
  OrderLineEntity,
  PaymentEntity,
  PaymentMethodEntity,
  ProductEntity,
  ShipmentEntity,
  ShippingMethodEntity,
  VariantEntity
} from './entities';
import { getConfig } from '../config';

export const ENTITIES = [
  AdminEntity,
  OptionEntity,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
  CollectionEntity,
  AssetEntity,
  AddressEntity,
  CustomerEntity,
  OrderEntity,
  OrderLineEntity,
  PaymentEntity,
  ShipmentEntity,
  PaymentMethodEntity,
  ShippingMethodEntity,
  AssetInProductEntity,
  CountryEntity
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const { url } = getConfig().db;

        return {
          type: 'postgres',
          url: url,
          // TODO: Do i need to add entities here?
          entities: [...ENTITIES],
          // Indicates if database schema should be auto created on every application launch.
          synchronize: true,
          autoLoadEntities: true
        };
      }
    })
  ]
})
export class PersistanceModule {}
