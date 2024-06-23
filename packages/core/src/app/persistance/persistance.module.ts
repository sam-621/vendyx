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
  AssetEntity,
  AddressEntity,
  CustomerEntity,
  OrderEntity,
  OrderLineEntity,
  PaymentEntity,
  ShipmentEntity,
  PaymentMethodEntity,
  ShippingMethodEntity
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const { url } = getConfig().db;

        const { plugins } = getConfig();
        const entitiesInPlugins = plugins.map(plugin => plugin.entities).flat();

        return {
          type: 'postgres',
          url: url,
          entities: [...ENTITIES, ...entitiesInPlugins],
          // Indicates if database schema should be auto created on every application launch.
          synchronize: true,
          autoLoadEntities: true
        };
      }
    })
  ]
})
export class PersistanceModule {}
