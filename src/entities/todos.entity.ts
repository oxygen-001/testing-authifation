import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ nullable: false })
  photo: string;

  @ManyToOne(() => Users, (user) => user.todos)
  user: Users;
}
