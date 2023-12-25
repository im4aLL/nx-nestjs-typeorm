import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService, Todo],
})
export class TodoModule {}
