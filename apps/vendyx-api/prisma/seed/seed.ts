import { PrismaClient } from '@prisma/client';

import { generateCountries } from './countries.seed';
import { generatePaymentIntegrations } from './payment.seed';
import { generateShippingHandlers } from './shipment.seed';
import { generateShop } from './shop.seed';

const prisma = new PrismaClient();

async function main() {
  const [, stripe, paypal] = await generatePaymentIntegrations(prisma);
  const [, flatPrice] = await generateShippingHandlers(prisma);
  const [, mx, us] = await generateCountries(prisma);
  await generateShop(prisma, { stripe, paypal, flatPrice, mx, us });
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
