import { DataSource } from 'typeorm';

const cleanDb = async () => {
  const dataSource = await new DataSource({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/vendyx',
    // url: 'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway',
    synchronize: false,
  }).initialize();

  await dataSource.query('DELETE FROM "order_line";');
  await dataSource.query('DELETE FROM "orders";');
  await dataSource.query('DELETE FROM "option_value_on_variant";');
  await dataSource.query('DELETE FROM "option_value";');
  await dataSource.query('DELETE FROM "option";');
  await dataSource.query('DELETE FROM "variant";');
  await dataSource.query('DELETE FROM "product";');
};

const cleanOrders = async () => {
  const dataSource = await new DataSource({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/vendyx',
    // url: 'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway',
    synchronize: false,
  }).initialize();

  await dataSource.query('DELETE FROM "order_line";');
  await dataSource.query('DELETE FROM "orders";');
  await dataSource.query('DELETE FROM "customer";');
  await dataSource.query('DELETE FROM "payment";');
};

// cleanDb();
cleanOrders();
