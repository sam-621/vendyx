import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth';
import { PaymentModule } from '@/payment';
import { ShipmentModule } from '@/shipments';
import { StorageModule } from '@/storage';

import { AddressService } from './address';
import { AssetService } from './asset';
import { CollectionService } from './collection';
import { CountryService } from './country';
import { CustomerService } from './customer';
import { MetricsService } from './metrics';
import { OptionService } from './option';
import { OrderService } from './order';
import { PaymentMethodService } from './payment-method';
import { ProductService } from './product';
import { ShippingMethodService } from './shipping-method';
import { ShopService } from './shop';
import { SubscriptionService } from './subscription';
import { UserService } from './user';
import { VariantService } from './variant';
import { ZoneService } from './zone';

const SERVICES = [
  UserService,
  ShopService,
  ProductService,
  VariantService,
  OptionService,
  AssetService,
  PaymentMethodService,
  ShippingMethodService,
  ZoneService,
  CountryService,
  OrderService,
  CustomerService,
  MetricsService,
  SubscriptionService,
  CollectionService,
  AddressService
];

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, StorageModule, ShipmentModule, PaymentModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}
