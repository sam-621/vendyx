import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

import { BusinessError } from '@/lib/errors';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost) {
    Logger.error({
      code: exception.code,
      message: exception.message,
      metadata: exception.metadata,
      raw: exception
    });

    if (exception instanceof HttpException) {
      const errorMessage = (exception.getResponse() as HttpGenericError).message;
      const errorCode = (exception.getResponse() as HttpGenericError).error;
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      const formattedErrorCode = errorCode.toUpperCase().replace(' ', '_');

      // for some reason sometimes the graphql playground does not find the favicon.ico and throws an error
      if (errorMessage == 'Cannot GET /favicon.ico' || exception.getStatus() === 404) {
        response.json({ message: 'Not Found', code: 'NOT_FOUND' });
        return;
      }

      throw new GraphQLError(errorMessage, { extensions: { code: formattedErrorCode } });
    }

    throw new GraphQLError('INTERNAL SERVER ERROR', {
      extensions: { code: 'INTERNAL SERVER ERROR' }
    });
  }
}

export type HttpGenericError = {
  message: string;
  statusCode: HttpStatus;
  error: string;
};
