import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export enum roles {
  SUPERADMIN = 'Superadmin',
  ADMIN = 'Admin',
  DRIVER = 'Driver',
  USER = 'User'
}

@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field((type) => String)
  role: roles;

  @ManyToOne(() => User, (user) => user.roles)
  @Field((type) => User)
  user: User;
}
