import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';
import { PaymentModule } from '@/payment';
import { ShipmentModule } from '@/shipments';
import { StorageModule } from '@/storage';

import { AssetService } from './asset';
import { CountryService } from './country';
import { CustomerService } from './customer';
import { OptionService } from './option';
import { OrderService } from './order';
import { PaymentMethodService } from './payment-method';
import { ProductService } from './product';
import { ShippingMethodService } from './shipping-method';
import { ShopService } from './shop';
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
  CustomerService
];

@Module({
  imports: [AuthModule, StorageModule, ShipmentModule, PaymentModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}
