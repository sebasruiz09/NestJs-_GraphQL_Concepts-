import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

// a resolver is the equality of a controller in a rest api
@Resolver()
export class UserResolver {
  //define the query imported from @nest/graphql
  // set query documentation using { name and description attributes }
  @Query(() => String, {
    name: 'hello',
    description: 'this is first user method',
  })
  helloUser(): string {
    return 'first test method';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'generate a random number',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'random number generated',
  })
  getRandomToZero(
    // passing arguments to query
    @Args(
      'initial', // specify argument conditions
      { type: () => Int },
    )
    initial: number,
    @Args('limit', { type: () => Int, defaultValue: 6, nullable: true })
    limit: number,
  ): number {
    return Math.floor(Math.random() * (limit - initial) + initial);
  }
}
