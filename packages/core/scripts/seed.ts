import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { AdminEntity } from '../src/app/persistance';

const generateAdmin = async () => {
  const username = 'admin';
  const password = 'admin';

  const dataSource = await new DataSource({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/vendyx',
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

function main() {
  generateAdmin();
}

main();
