import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('user-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  /**
   * Handle the result of the validate method from the strategy.
   * If the validate method returns null or throw an error that means the token is invalid.
   * If the validate method returns a user that means the token is valid.
   *
   * @param err Error thrown from the validate method
   * @param user data returned from the validate method
   */
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Invalid access token');
    }

    return user;
  }
}
