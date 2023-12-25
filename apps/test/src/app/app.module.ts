import { Module } from '@nestjs/common';
import { TodoModule } from '@nx-nestjs-typeorm/todo';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
