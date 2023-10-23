import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todos } from './todos.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Todos, (todos) => todos.user)
  todos: Todos[];
}
