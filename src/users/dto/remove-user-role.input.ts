import { InputType } from '@nestjs/graphql';
import { SetUserRoleInput } from './set-user-role.input';

@InputType()
export class RemoveUserRoleInput extends SetUserRoleInput {}
