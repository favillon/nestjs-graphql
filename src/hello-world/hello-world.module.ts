import { Module } from '@nestjs/common';
import { Args, Float, Int, Query } from '@nestjs/graphql';

import { HelloWorldResolver } from './hello-world.resolver';

@Module({
  providers: [HelloWorldResolver]
})
export class HelloWorldModule {

  @Query(()=> String, { name: 'sayHello', description: 'Method to say Hello World' })
  helloWorld() :string {
    return 'Hello World of NestJS And GraphQL!';
  }

  @Query(() => Float, { name: 'randomNumber', description: 'Method to get Random Number' })
  getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }

  @Query(() => Int, { name: 'randomFromZeroTo', description: 'Method to get Random Number From Zero to N' })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int }) to: number
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }

  @Query(() => Int, { name: 'randomFromZeroToWhitDefaultNumber', description: 'Method to get Random Number From Zero to N with default value' })
  getRandomFromZeroToWithDefaultNumber(
    @Args('to', { nullable: true, type: () => Int }) to: number = 6
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }
}
