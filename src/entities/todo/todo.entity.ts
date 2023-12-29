import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from '../shared';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isCompleted: boolean;

  // { eager: true }
  // if eager set to true, it will load associated user along with todo data
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
