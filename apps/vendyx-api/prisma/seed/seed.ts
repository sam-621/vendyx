import { PrismaClient } from '@prisma/client';

import { generatePaymentIntegrations } from './payment.seed';

const prisma = new PrismaClient();

async function main() {
  await generatePaymentIntegrations(prisma);
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
