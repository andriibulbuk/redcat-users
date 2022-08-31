import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './entities/role.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { SetUserRoleInput } from './dto/set-user-role.input';
import { RemoveUserRoleInput } from './dto/remove-user-role.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Role])
  roles(@Parent() user: User): Promise<Role[]> {
    return this.usersService.getRoles(user.id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  setUserRole(@Args('setUserRoleInput') setUserRoleInput: SetUserRoleInput) {
    return this.usersService.setRole(
      setUserRoleInput.id,
      setUserRoleInput.role
    );
  }

  @Mutation(() => User)
  removeUserRole(
    @Args('removeUserRoleInput') removeUserRoleInput: RemoveUserRoleInput
  ) {
    return this.usersService.removeRole(
      removeUserRoleInput.id,
      removeUserRoleInput.role
    );
  }
}
