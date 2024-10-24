import { PrismaClient } from '@prisma/client';

import { generateCountries } from './countries.seed';
import { generatePaymentIntegrations } from './payment.seed';
import { generateShippingHandlers } from './shipment.seed';

const prisma = new PrismaClient();

async function main() {
  await generatePaymentIntegrations(prisma);
  await generateShippingHandlers(prisma);
  await generateCountries(prisma);
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
