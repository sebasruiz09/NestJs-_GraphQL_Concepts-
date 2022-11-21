import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  MinLength,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

//! create a custom input
@InputType()
export class UpdateTodoInput {
  @IsOptional()
  @MinLength(5)
  @MaxLength(30)
  @IsString()
  @Field(() => String, { description: 'what needs to be done', nullable: true })
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
