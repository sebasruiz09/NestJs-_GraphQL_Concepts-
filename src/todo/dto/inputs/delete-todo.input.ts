import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

//create a custom input
@InputType()
export class CreateTodoInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'id for todo', nullable: false })
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, {
    description: 'validate to delete todo item',
    nullable: false,
    defaultValue: false,
  })
  validate: boolean;
}
