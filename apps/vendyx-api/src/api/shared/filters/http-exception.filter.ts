import { Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

/**
 * Catch any Http error, log it and throw it again because most of them are thrown by us intentionally
 */
@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException): any {
    // Apollo sometimes throws this error, we don't need to log it
    if (exception.message === 'Cannot GET /favicon.ico') {
      return null;
    }

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
