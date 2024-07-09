import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AdminService,
  AssetService,
  CollectionService,
  CountryService,
  CustomerService,
  OptionService,
  OptionValueService,
  OrderService,
  PaymentMethodService,
  PaymentService,
  ProductService,
  ShipmentService,
  ShippingMethodService,
  StateService,
  VariantService
} from './services';
import { ENTITIES } from '../persistance';
import { SecurityModule } from '../security';

const SERVICES = [
  AdminService,
  ProductService,
  VariantService,
  OptionService,
  OptionValueService,
  AssetService,
  OrderService,
  PaymentMethodService,
  PaymentService,
  ShippingMethodService,
  ShipmentService,
  CustomerService,
  CollectionService,
  CountryService,
  StateService
];

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([...ENTITIES])],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class ServiceModule {}
