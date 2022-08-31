import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @IsUUID()
  @Field()
  id: string;
}
