import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@ArgsType()
export class statusArgs {
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, {
    name: 'status',
    description: 'set value to filter results',
  })
  status: boolean;
}
