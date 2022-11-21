import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class categoriesTodo {
  @Field(() => Int, {
    name: 'pending',
    deprecationReason: 'this method is deprecated',
  })
  pending: number;

  @Field(() => Int, { name: 'passed' })
  passed: number;

  @Field(() => Int, { name: 'all' })
  all: number;
}
