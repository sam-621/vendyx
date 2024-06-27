import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

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
    synchronize: false
  }).initialize();

  console.log('Generating admin user 🧑‍💼');
  const username = 'admin';
  const password = bcrypt.hashSync('admin', 10);
  await dataSource.query(
    `INSERT INTO administrator (username, password) VALUES ('${username}', '${password}');`
  );
  console.log('Admin user generated ✨');
  console.log("Username: 'admin'");
  console.log("Password: 'admin'");
  console.log();

  console.log('Adding shipping and payment methods 🚚 💳');
  await dataSource.query(`
    INSERT INTO shipping_method (id, name, description, price_calculator_code, enabled)
    VALUES ('96f617d5-0e01-4993-97c7-512d2870efd4', 'Fedex', 'Envíos con Fedex', 'fedex-calculator', true);

    INSERT INTO payment_method (id, name, description, integration_code, enabled)
    VALUES ('d438933f-7fb3-4c7b-9424-ead4cae81866', 'Stripe', 'Pago con tarjeta de crédito y débito', 'stripe', true),
           ('27333884-a0db-4e37-8056-a6522d459b20', 'PayPal', 'Pago con tu cuenta de PayPal', 'paypal', true);
  `);
  console.log('Shipping and payment methods added ✨');
  console.log("Shipping methods: 'Fedex'");
  console.log("Payment methods: 'Stripe', 'PayPal'");
  console.log();

  console.log('Database is populated 🎉');
  await dataSource.destroy();
};

cleanDb();
