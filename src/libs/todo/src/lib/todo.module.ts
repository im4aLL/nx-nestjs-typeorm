import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@nx-nestjs-typeorm/entities';
import { UserModule } from '@nx-nestjs-typeorm/user';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class TodoModule {}
