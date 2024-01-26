import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { UnauthorizedError } from '@/lib/errors';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      throw new UnauthorizedError('Invalid token', {
        err,
        info: info?.message,
      });
    }

    return user;
  }
}
