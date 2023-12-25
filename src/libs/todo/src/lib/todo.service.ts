/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private todo: Todo) {}

  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  findAll() {
    return this.todo.findAll();
  }

  findOne(id: number) {
    return this.todo.findOne(id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return this.todo.remove(id);
  }
}
