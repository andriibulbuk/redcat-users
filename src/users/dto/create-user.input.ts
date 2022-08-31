import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsPhoneNumber, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(3, 25)
  @Field()
  username: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPhoneNumber()
  @Field()
  phone: string;
}
