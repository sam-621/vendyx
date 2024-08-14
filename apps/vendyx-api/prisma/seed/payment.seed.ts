import { PrismaClient } from '@prisma/client';

export const generatePaymentIntegrations = async (prisma: PrismaClient) => {
  await prisma.paymentIntegration.upsert({
    where: { handlerCode: 'stripe' },
    update: {},
    create: {
      name: 'Stripe',
      handlerCode: 'stripe',
      icon: 'icon.png',
      metadata: [{ key: 'secret_key', label: 'Secret Key', type: 'text' }]
    }
  });

  await prisma.paymentIntegration.create({
    data: {
      name: 'PayPal',
      handlerCode: 'paypal',
      icon: 'icon.png',
      metadata: [{ key: 'client_key', label: 'Client key', type: 'text' }]
    }
  });
};
