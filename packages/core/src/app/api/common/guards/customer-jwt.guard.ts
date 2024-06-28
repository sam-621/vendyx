import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLError } from 'graphql';

@Injectable()
export class CustomerJwtAuthGuard extends AuthGuard('customer-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new GraphQLError('Invalid token', { extensions: { code: 'UNAUTHORIZED' } });
      // throw new UnauthorizedError('Invalid token', {
      //   err,
      //   info: info?.message
      // });
    }

    return user;
  }
}
