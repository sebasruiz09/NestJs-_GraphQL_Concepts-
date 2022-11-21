import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { name: 'id' })
  id: number;

  @Field(() => String, { name: 'description' })
  description?: string;

  @Field(() => Boolean, { name: 'done' })
  done?: boolean;
}
