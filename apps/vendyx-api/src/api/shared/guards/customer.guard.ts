import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Customer } from '@prisma/client';
import { Observable } from 'rxjs';

import { TCurrentCustomer } from '../decorator/current-customer.decorator';

@Injectable()
export class CustomerJwtAuthGuard extends AuthGuard('customer-jwt') {
  /**
   * This is the first method that will be executed in the authorization flow,
   * It executes before the validate method from the strategy.
   *
   * Get the request from the context and pass it to the super.canActivate method, replacing the `getRequest` method.
   * THis is needed for the AuthGuard to work with GraphQL and also to be able to use the `@CurrentUser` decorator.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  /**
   * Handle the result of the validate method from the strategy,
   * This is the last method that will be executed in the authorization flow.
   *
   * If the validate method returns null or throw an error that means the token is invalid.
   * If the validate method returns a user that means the token is valid.
   *
   * @param err Error thrown from the validate method
   * @param customer data returned from the validate method
   */
  handleRequest<T = TCurrentCustomer>(err: any, customer: Customer): T {
    if (err || !customer) {
      throw new UnauthorizedException('Invalid access token');
    }

    if (!customer.enabled) {
      throw new UnauthorizedException('Account is disabled');
    }

    return {
      id: customer.id,
      email: customer.email,
      enabled: customer.enabled
    } as T;
  }
}
