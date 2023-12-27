import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@nx-nestjs-typeorm/auth';
import { FiltersModule } from '@nx-nestjs-typeorm/filters';
import { Todo, TodoModule } from '@nx-nestjs-typeorm/todo';
import { User, UserModule } from '@nx-nestjs-typeorm/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'nest-todo',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 5432,
      entities: [User, Todo],
      synchronize: true,
    }),
    FiltersModule,
    TodoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
