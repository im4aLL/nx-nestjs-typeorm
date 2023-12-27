import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
  exports: [],
})
export class FiltersModule {}
