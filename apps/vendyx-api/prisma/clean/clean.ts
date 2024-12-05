import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,

    prisma.variantOptionValue.deleteMany(),
    prisma.optionValue.deleteMany(),
    prisma.productOption.deleteMany(),
    prisma.option.deleteMany(),
    prisma.variant.deleteMany(),
    prisma.productAsset.deleteMany(),
    prisma.product.deleteMany(),

    prisma.asset.deleteMany(),

    prisma.shipment.deleteMany(),
    prisma.shippingMethod.deleteMany(),
    prisma.shippingHandler.deleteMany(),
    prisma.zone.deleteMany(),

    prisma.payment.deleteMany(),
    prisma.paymentMethod.deleteMany(),

    prisma.stateZone.deleteMany(),
    prisma.state.deleteMany(),
    prisma.country.deleteMany(),

    prisma.shop.deleteMany(),
    prisma.user.deleteMany()
  ]);
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
