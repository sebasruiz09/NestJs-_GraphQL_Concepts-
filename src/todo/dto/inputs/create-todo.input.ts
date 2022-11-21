import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsOptional,
  MinLength,
  IsString,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

//* create a custom input
@InputType()
export class CreateTodoInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'id for todo', nullable: false })
  id: number;

  @IsOptional()
  @MinLength(5)
  @MaxLength(30)
  @IsString()
  @Field(() => String, { description: 'what needs to be done' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {
    description: 'todo state',
    defaultValue: true,
    nullable: true,
  })
  done?: boolean;
}
