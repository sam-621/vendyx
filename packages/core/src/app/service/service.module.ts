import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AdminService,
  AssetService,
  CustomerService,
  OptionService,
  OptionValueService,
  OrderService,
  PaymentMethodService,
  PaymentService,
  ProductService,
  ShipmentService,
  ShippingMethodService,
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
  CustomerService
];

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([...ENTITIES])],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class ServiceModule {}
