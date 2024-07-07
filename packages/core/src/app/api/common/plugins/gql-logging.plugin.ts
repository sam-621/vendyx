import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Logger } from '@nestjs/common';

export class GqlLoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(requestContext): Promise<GraphQLRequestListener<any>> {
    const isIntrospectionQuery = requestContext.request.operationName === 'IntrospectionQuery';

    // Avoid logging introspection queries
    if (isIntrospectionQuery) {
      return {
        async willSendResponse() {
          return;
        }
      };
    }

    console.log({
      requestContext
    });

    const req = requestContext.request;
    const url = requestContext?.request?.http?.headers?.get('referer') ?? '';

    console.log({
      req
    });

    Logger.debug(`${req.http?.method} ${url ? new URL(url).pathname : ''} ${req.operationName}`);

    return {
      async willSendResponse() {
        return;
      }
    };
  }
}
