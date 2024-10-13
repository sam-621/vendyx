import { Catch, InternalServerErrorException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

/**
 * Catch any unhandled error, log it and throw an InternalServerErrorException
 */
@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error): any {
    Logger.error({
      type: 'GLOBAL_ERROR',
      name: exception.name,
      message: exception.message,
      stack: exception.stack,
      raw: exception
    });

    throw new InternalServerErrorException();
  }
}
