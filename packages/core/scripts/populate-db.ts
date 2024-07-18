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
    'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway',
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

  const staticCountries = [
    { name: 'Mexico' },
    { name: 'Colombia' },
    { name: 'Peru' },
    { name: 'Argentina' },
    { name: 'Chile' },
    { name: 'Venezuela' },
    { name: 'Brazil' },
    { name: 'United States' },
    { name: 'Canada' }
  ];

  const mexico = await dataSource.getRepository(CountryEntity).save({ name: 'Mexico' });
  const colombia = await dataSource.getRepository(CountryEntity).save({ name: 'Colombia' });
  const peru = await dataSource.getRepository(CountryEntity).save({ name: 'Peru' });
  const argentina = await dataSource.getRepository(CountryEntity).save({ name: 'Argentina' });
  const chile = await dataSource.getRepository(CountryEntity).save({ name: 'Chile' });
  const venezuela = await dataSource.getRepository(CountryEntity).save({ name: 'Venezuela' });
  const brazil = await dataSource.getRepository(CountryEntity).save({ name: 'Brazil' });
  const unitedStates = await dataSource
    .getRepository(CountryEntity)
    .save({ name: 'United States' });
  const canada = await dataSource.getRepository(CountryEntity).save({ name: 'Canada' });

  const localZone = await dataSource
    .getRepository(ZoneEntity)
    .save({ name: 'Local', countries: [mexico] });

  const internationalZone = await dataSource.getRepository(ZoneEntity).save({
    name: 'International',
    countries: [colombia, peru, argentina, chile, venezuela, brazil, unitedStates, canada]
  });

  console.log('Countries and zones added ✨');
  console.log("countries: 'Mexico'");
  console.log("Zones: 'Local'");
  console.log();

  console.log('Adding shipping and payment methods 🚚 💳');

  await dataSource.getRepository(ShippingMethodEntity).save({
    name: 'Express',
    description: 'Deliver on 3 or 5 working days',
    priceCalculator: {
      code: 'flat-price-calculator',
      args: [
        {
          key: 'price',
          value: '15000'
        }
      ]
    },
    zone: localZone
  });
  await dataSource.getRepository(ShippingMethodEntity).save({
    name: 'Standard',
    description: 'Deliver on 5 or 7 working days',
    priceCalculator: {
      code: 'flat-price-calculator',
      args: [
        {
          key: 'price',
          value: '10000'
        }
      ]
    },
    zone: localZone
  });

  await dataSource.getRepository(ShippingMethodEntity).save({
    name: 'Express',
    description: 'Deliver on 3 or 5 working days',
    priceCalculator: {
      code: 'flat-price-calculator',
      args: [
        {
          key: 'price',
          value: '25000'
        }
      ]
    },
    zone: internationalZone
  });
  await dataSource.getRepository(ShippingMethodEntity).save({
    name: 'Standard',
    description: 'Deliver on 5 or 7 working days',
    priceCalculator: {
      code: 'flat-price-calculator',
      args: [
        {
          key: 'price',
          value: '15000'
        }
      ]
    },
    zone: internationalZone
  });

  await dataSource.getRepository(PaymentMethodEntity).save({
    name: 'Card / Credit card',
    handler: {
      code: 'stripe',
      args: []
    }
  });
  await dataSource.getRepository(PaymentMethodEntity).save({
    name: 'PayPal',
    handler: {
      code: 'paypal',
      args: []
    }
  });

  console.log('Shipping and payment methods added ✨');
  console.log();

  console.log('Database is populated 🎉');
  await dataSource.destroy();
};

cleanDb();
