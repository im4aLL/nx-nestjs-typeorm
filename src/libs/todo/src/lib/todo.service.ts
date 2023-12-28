import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '@nx-nestjs-typeorm/errors';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './entities';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const item = this.todoRepository.create(createTodoDto);

    return await this.todoRepository.save(item);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: string) {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundError();
    }

    Object.assign(item, updateTodoDto);

    return await this.todoRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundError();
    }

    return await this.todoRepository.remove(item);
  }
}
