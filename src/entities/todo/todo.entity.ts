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

  @ManyToOne(() => User, (user) => user.todos) // { eager: true }
  user: User;
}
