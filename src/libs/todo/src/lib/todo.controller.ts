import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { Serialize } from '@nx-nestjs-typeorm/decorators';
import { TodoDto } from './dtos/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Serialize(TodoDto)
  create(@Body() createTodoDto: CreateTodoDto, @Body('userId') userId: string) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get('raw')
  testRaw(@Query('q') q: string) {
    return this.todoService.testRaw(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
