import { Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { BusinessError } from '@/lib/errors';

@Catch()
export class BusinessExceptionFilter implements GqlExceptionFilter {
  catch(exception: BusinessError) {
    Logger.error({
      code: exception.code,
      message: exception.message,
      metadata: exception.metadata,
      raw: exception
    });

    // No Favicon found apollo server error
    if ((exception as any)?.response?.status === 404) return;

    throw new GraphQLError('INTERNAL SERVER ERROR', {
      extensions: { code: 'INTERNAL SERVER ERROR' }
    });
  }
}
