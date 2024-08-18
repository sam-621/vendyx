import { PrismaClient } from '@prisma/client';

export const generateShippingHandlers = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
    prisma.shippingHandler.upsert({
      where: { handlerCode: 'flat_price' },
      update: {},
      create: {
        name: 'Flat Price',
        handlerCode: 'flat_price',
        metadata: JSON.stringify([{ key: 'price', label: 'Price', type: 'price' }])
      }
    })
  ]);
};
