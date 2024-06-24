import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('HelloWorld')
export class HelloWorldResolver {
  @Query('helloWorld')
  async helloWorld() {
    return {
      message: 'Hello World!'
    };
  }
}
