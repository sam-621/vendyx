import { DataSource } from 'typeorm';

const DbUrl = {
  remote:
    'postgresql://postgres:KEcyblbOCFexrbrsOojSnzyZNUYDZifJ@roundhouse.proxy.rlwy.net:47601/railway',
  local: 'postgres://postgres:postgres@localhost:5432/ebloc'
};

const cleanDb = async () => {
  console.log('Cleaning database 🚀');
  console.log();

  const dataSource = await new DataSource({
    type: 'postgres',
    url: DbUrl.local,
    synchronize: false
  }).initialize();

  console.log('Cleaning the database 🧹');
  await dataSource.query('DELETE FROM "administrator";');
  await dataSource.query('DELETE FROM "order_line";');
  await dataSource.query('DELETE FROM "orders";');
  await dataSource.query('DELETE FROM "customer";');
  await dataSource.query('DELETE FROM "address";');
  await dataSource.query('DELETE FROM "payment";');
  await dataSource.query('DELETE FROM "shipment";');
  await dataSource.query('DELETE FROM "shipping_method";');
  await dataSource.query('DELETE FROM "payment_method";');
  await dataSource.query('DELETE FROM "option_value_on_variant";');
  await dataSource.query('DELETE FROM "option_value";');
  await dataSource.query('DELETE FROM "option";');
  await dataSource.query('DELETE FROM "variant";');
  await dataSource.query('DELETE FROM "asset_on_product";');
  await dataSource.query('DELETE FROM "asset";');
  await dataSource.query('DELETE FROM "product";');
  console.log('Database cleaned ✨');
  console.log();

  await dataSource.destroy();
};

cleanDb();
