import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AdminService,
  OptionService,
  OptionValueService,
  ProductService,
  VariantService,
} from './services';
import {
  AdminEntity,
  AssetEntity,
  OptionEntity,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
} from '../persistance';
import { SecurityModule } from '../security';

@Module({
  imports: [
    SecurityModule,
    TypeOrmModule.forFeature([
      AdminEntity,
      ProductEntity,
      VariantEntity,
      OptionEntity,
      OptionValueEntity,
      AssetEntity,
    ]),
  ],
  providers: [
    AdminService,
    ProductService,
    VariantService,
    OptionService,
    OptionValueService,
  ],
  exports: [
    AdminService,
    ProductService,
    VariantService,
    OptionService,
    OptionValueService,
  ],
})
export class ServiceModule {}
