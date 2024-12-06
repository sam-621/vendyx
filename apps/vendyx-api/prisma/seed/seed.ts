import { PrismaClient } from '@prisma/client';

import { generateCountries } from './countries.seed';
import { generateShop } from './shop.seed';

const prisma = new PrismaClient();

async function main() {
  const [mx, us] = await generateCountries(prisma);
  await generateShop(prisma, { mx, us });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
