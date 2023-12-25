import { Module } from '@nestjs/common';
import { SharedModule } from '@nx-nestjs-typeorm/shared';
import { TodoModule } from '@nx-nestjs-typeorm/todo';

@Module({
  imports: [TodoModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
