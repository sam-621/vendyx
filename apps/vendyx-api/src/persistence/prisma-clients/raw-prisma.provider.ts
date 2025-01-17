import { PrismaService } from 'nestjs-prisma';

const useFactory = (prisma: PrismaService) => {
  return prisma;
};

export type RawPrisma = ReturnType<typeof useFactory>;

export const RAW_PRISMA = Symbol('RAW_PRISMA');

export const RawPrismaClientProvider = {
  provide: RAW_PRISMA,
  inject: [PrismaService],
  useFactory
};
