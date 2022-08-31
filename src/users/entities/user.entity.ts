import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @Column()
  @Field((type) => String)
  username: string;

  @Column()
  @Field((type) => String)
  email: string;

  @OneToMany(() => Role, (role) => role.user, {
    cascade: true
  })
  @Field((type) => [Role])
  roles: Role[];

  @Column({ unique: true })
  @Field((type) => String)
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
