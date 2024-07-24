import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

// TODO: ONLY THROW GRAPHQL ERRORS IN GRAPHQL CONTEXTS
@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    Logger.error({
      code: (exception as any).code,
      message: exception.message,
      metadata: (exception as any).metadata,
      raw: exception
    });

    if (exception instanceof GraphQLError) {
      return exception;
    }

    if (exception instanceof HttpException) {
      const errorMessage = (exception.getResponse() as HttpGenericError).message;
      // const errorCode = (exception.getResponse() as HttpGenericError).error;
      const statusCode = exception.getStatus();
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      // const formattedErrorCode = errorCode.toUpperCase().replace(' ', '_');

      // for some reason sometimes the graphql playground does not find the favicon.ico and throws an error
      if (errorMessage == 'Cannot GET /favicon.ico' || exception.getStatus() === 404) {
        response.json({ message: 'Not Found', code: 'NOT_FOUND' });
        return;
      }

      return response.status(statusCode).json({
        timestamp: new Date().toISOString(),
        message: errorMessage
      });
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
