import { Catch, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

/**
 * Catch any unhandled prisma error, log it and throw an InternalServerErrorException
 * We don't want to expose any prisma error to the client
 */
@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError
)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    console.log('prisma');
    Logger.error({
      type: 'PRISMA_ERROR',
      name: exception.name,
      code: exception.code,
      message: exception.message,
      meta: exception.meta,
      raw: exception
    });

    if (exception.code === 'P2025') {
      throw new NotFoundException('Entity not found');
    }

    throw new InternalServerErrorException();
  }
}
