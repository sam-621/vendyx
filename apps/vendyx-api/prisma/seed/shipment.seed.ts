import { PrismaClient } from '@prisma/client';

export const generateShippingHandlers = async (prisma: PrismaClient) => {
  return await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
    prisma.shippingHandler.upsert({
      where: { handlerCode: 'flat-price' },
      update: {},
      create: {
        name: 'Flat Price',
        handlerCode: 'flat-price',
        metadata: JSON.stringify([{ key: 'price', label: 'Price', type: 'price' }])
      }
    })
  ]);
};
