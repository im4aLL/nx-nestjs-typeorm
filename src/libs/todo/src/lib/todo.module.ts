import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
  imports: [TodoModule],
})
export class TodoModule {}
