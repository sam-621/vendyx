import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

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
  VariantEntity,
  ZoneEntity
} from '../src/app/persistance/entities';

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
  CountryEntity,
  ZoneEntity
];

const DbUrl = {
  remote:
    'postgresql://postgres:KEcyblbOCFexrbrsOojSnzyZNUYDZifJ@roundhouse.proxy.rlwy.net:47601/railway',
  local: 'postgres://postgres:postgres@localhost:5432/ebloc'
};

const cleanDb = async () => {
  console.log('Populating database 🚀');
  console.log();

  const dataSource = await new DataSource({
    type: 'postgres',
    url: DbUrl.local,
    entities: [...ENTITIES],
    synchronize: true
  }).initialize();

  console.log('Generating admin user 🧑‍💼');
  const username = 'admin';
  const password = bcrypt.hashSync('admin', 10);
  await dataSource.getRepository(AdminEntity).save({ username, password });
  console.log('Admin user generated ✨');
  console.log("Username: 'admin'");
  console.log("Password: 'admin'");
  console.log();

  console.log('Adding countries and zones 🌎');
  const country = await dataSource.getRepository(CountryEntity).save({ name: 'Mexico' });
  const zone = await dataSource
    .getRepository(ZoneEntity)
    .save({ name: 'Local', countries: [country] });
  console.log('Countries and zones added ✨');
  console.log("countries: 'Mexico'");
  console.log("Zones: 'Local'");
  console.log();

  console.log('Adding shipping and payment methods 🚚 💳');
  await dataSource.getRepository(ShippingMethodEntity).save([
    {
      id: '96f617d5-0e01-4993-97c7-512d2870efd4',
      name: 'Express',
      description: 'Deliver on 3 or 5 working days',
      priceCalculatorCode: 'flat-price-calculator',
      zone
    },
    {
      name: 'Standard',
      description: 'Deliver on 5 or 7 working days',
      priceCalculatorCode: 'flat-price-calculator',
      zone
    }
  ]);
  await dataSource.getRepository(PaymentMethodEntity).save([
    {
      id: 'd438933f-7fb3-4c7b-9424-ead4cae81866',
      name: 'Stripe',
      description: 'Pay with credit or debit card',
      integrationCode: 'stripe'
    },
    {
      id: '27333884-a0db-4e37-8056-a6522d459b20',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      integrationCode: 'paypal'
    }
  ]);
  console.log('Shipping and payment methods added ✨');
  console.log("Shipping methods: 'Express', 'Standard'");
  console.log("Payment methods: 'Stripe', 'PayPal'");
  console.log();

  console.log('Database is populated 🎉');
  await dataSource.destroy();
};

cleanDb();
