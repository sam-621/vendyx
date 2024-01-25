import { Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { BusinessError } from '@/lib/errors';

@Catch(BusinessError)
export class BusinessExceptionFilter implements GqlExceptionFilter {
  catch(exception: BusinessError) {
    Logger.error({
      code: exception.code,
      message: exception.message,
      metadata: exception.metadata,
    });

    throw new GraphQLError(exception.message, {
      extensions: { code: exception.code },
    });
  }
}
