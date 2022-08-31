import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { Role, roles } from './entities/role.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const defaultUserRole = this.rolesRepository.create({ role: roles.USER });
    const newUser = this.usersRepository.create(createUserInput);

    newUser.roles = [defaultUserRole];

    return await this.usersRepository.save(newUser);
  }

  async getRoles(id: string): Promise<Role[]> {
    return await this.rolesRepository.find({ where: { user: { id: id } } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });

    this.checkForNotFoundException(user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });

    this.checkForNotFoundException(user);

    user.username = updateUserInput.username;
    user.email = updateUserInput.email;
    user.phone = updateUserInput.phone;

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });

    this.checkForNotFoundException(user);

    return await this.usersRepository.remove(user);
  }

  async setRole(id: string, role: roles): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: { roles: true },
      where: { id: id }
    });

    this.checkForNotFoundException(user);

    const currentRoles = user.roles.map(({ role }) => role);

    if (currentRoles.includes(role)) {
      return user;
    }

    const newRole = this.rolesRepository.create({ role: role });

    user.roles = [...user.roles, newRole];

    return await this.usersRepository.save(user);
  }

  async removeRole(id: string, role: roles): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: { roles: true },
      where: { id: id }
    });

    this.checkForNotFoundException(user);

    const roleToDelete = user.roles.find(
      ({ role: roleName }) => roleName === role
    );

    await this.rolesRepository.remove(roleToDelete);

    user.roles = user.roles.filter(({ role: roleName }) => roleName !== role);

    return await this.usersRepository.save(user);
  }

  private checkForNotFoundException(user) {
    if (!user) {
      throw new NotFoundException();
    }
  }
}
