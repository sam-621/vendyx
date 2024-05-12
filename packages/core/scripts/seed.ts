import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { AdminEntity } from '../src/app/persistance/entities/admin.entity';

// 'postgres://postgres:postgres@localhost:5432/vendyx'
const DB_URL =
  'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway';

const generateAdmin = async () => {
  const username = 'admin';
  const password = 'admin';

  const dataSource = await new DataSource({
    type: 'postgres',
    url: DB_URL,
    synchronize: false,
    entities: [AdminEntity],
  }).initialize();

  const adminRepository = dataSource.getRepository(AdminEntity);

  const admin = await adminRepository.findOne({
    where: {
      username,
    },
  });

  if (admin) {
    console.log({
      username: password,
      password: password,
    });
    await dataSource.destroy();

    return;
  }

  const hashedPassword = await bcrypt.hash('admin', 10);

  await adminRepository.save({ username, password: hashedPassword });

  console.log({
    username,
    password,
  });

  await dataSource.destroy();
};

const generateShippingAndPaymentMethods = async () => {
  const dataSource = await new DataSource({
    type: 'postgres',
    url: DB_URL,
    synchronize: false,
  }).initialize();

  const shippingMethod = await dataSource.query(`
    SELECT * FROM shipping_method
  `);

  const paymentMethods = await dataSource.query(`
    SELECT * FROM payment_method
  `);

  if (shippingMethod.length > 0 && paymentMethods.length > 0) {
    console.log('Shipping and payment methods already created ✨');
    await dataSource.destroy();
    return;
  }

  await dataSource.query(`
    INSERT INTO shipping_method (name, description, price_calculator_code, enabled)
    VALUES ('Fedex', 'Envíos con Fedex', 'fedex-calculator', true);

    INSERT INTO payment_method (name, description, integration_code, enabled)
    VALUES ('Stripe', 'Pago con tarjeta de crédito y débito', 'stripe', true),
           ('PayPal', 'Pago con tu cuenta de PayPal', 'paypal', true);
  `);

  console.log('Shipping and payment methods created ✨');
  await dataSource.destroy();
};

async function main() {
  await generateAdmin();
  await generateShippingAndPaymentMethods();
}

main();
