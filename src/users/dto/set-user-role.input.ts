import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { roles } from '../entities/role.entity';

@InputType()
export class SetUserRoleInput {
  @IsUUID()
  @Field()
  id: string;

  @IsEnum(roles, {
    message: `Value must be correct value (${roles.SUPERADMIN}, ${roles.ADMIN}, ${roles.DRIVER}, ${roles.USER})`
  })
  @Field()
  role: roles;
}
