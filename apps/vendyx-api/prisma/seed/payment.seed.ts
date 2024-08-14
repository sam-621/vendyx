import { PrismaClient } from '@prisma/client';

export const generatePaymentIntegrations = async (prisma: PrismaClient) => {
  await prisma.paymentIntegration.create({
    data: {
      name: 'Stripe',
      handlerCode: 'stripe',
      icon: 'icon.png',
      metadata: JSON.stringify([{ key: 'secret_key', value: '' }])
    }
  });

  await prisma.paymentIntegration.create({
    data: {
      name: 'PayPal',
      handlerCode: 'paypal',
      icon: 'icon.png',
      metadata: JSON.stringify([{ key: 'client_key', value: '' }])
    }
  });
};
