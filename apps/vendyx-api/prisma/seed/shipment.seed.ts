import { PrismaClient } from '@prisma/client';

export const generateShippingHandlers = async (prisma: PrismaClient) => {
  await prisma.shippingHandler.upsert({
    where: { handlerCode: 'flat_price' },
    update: {},
    create: {
      name: 'Flat Price',
      handlerCode: 'flat_price',
      metadata: JSON.stringify([{ key: 'price', label: 'Price', type: 'price' }])
    }
  });
};
