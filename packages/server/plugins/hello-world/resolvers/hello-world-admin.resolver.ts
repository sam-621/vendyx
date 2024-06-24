import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('HelloWorld')
export class HelloWorldResolverAdmin {
  @Query('helloWorld')
  async helloWorld() {
    return {
      message: 'Hello World! in admin '
    };
  }
}
