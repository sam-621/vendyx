import { PrismaService } from 'nestjs-prisma';

export const RAW_PRISMA = Symbol('RAW_PRISMA');

export type RawPrisma = ReturnType<typeof useFactory>;

const useFactory = (prisma: PrismaService) => {
  return prisma;
};

export const RawPrismaClientProvider = {
  provide: RAW_PRISMA,
  inject: [PrismaService],
  useFactory
};
