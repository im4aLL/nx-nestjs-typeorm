import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '@nx-nestjs-typeorm/errors';
import { ILike, Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from '@nx-nestjs-typeorm/entities';
import { UserService } from '@nx-nestjs-typeorm/user';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const item = this.todoRepository.create(createTodoDto);
    const user = await this.userService.findOne(userId);
    if (user) {
      item.user = user;
    }

    return await this.todoRepository.save(item);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: string) {
    return await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });
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

  async testRaw(q: string) {
    // return await this.todoRepository.query(
    //   `SELECT * FROM todo WHERE name ILIKE '%${q}%'`
    // );

    // return this.todoRepository.find({
    //   where: {
    //     name: ILike(`%${q}%`),
    //   },
    // });

    return this.todoRepository
      .createQueryBuilder()
      .where('name ILIKE :name', {
        name: `%${q}%`,
      })
      .getMany();
  }
}
