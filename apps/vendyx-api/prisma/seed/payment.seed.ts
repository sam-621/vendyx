import { PrismaClient } from '@prisma/client';

export const generatePaymentIntegrations = async (prisma: PrismaClient) => {
  return await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
    prisma.paymentIntegration.upsert({
      where: { handlerCode: 'stripe' },
      update: {},
      create: {
        name: 'Stripe',
        handlerCode: 'stripe',
        icon: 'icon.png',
        metadata: [{ key: 'secret_key', label: 'Secret Key', type: 'text' }]
      }
    }),
    prisma.paymentIntegration.upsert({
      where: { handlerCode: 'paypal' },
      update: {},
      create: {
        name: 'PayPal',
        handlerCode: 'paypal',
        icon: 'icon.png',
        metadata: [{ key: 'client_key', label: 'Client key', type: 'text' }]
      }
    })
  ]);
};
