import { Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

/**
 * Catch any Http error, log it and throw it again because most of them are thrown by us intentionally
 */
@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException): any {
    Logger.error({
      type: 'HTTP_ERROR',
      name: exception.name,
      message: exception.message,
      status: exception.getStatus(),
      cause: exception.cause,
      raw: exception
    });

    throw exception;
  }
}
