import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@nx-nestjs-typeorm/auth';
import { DbModule } from '@nx-nestjs-typeorm/db';
import { FiltersModule } from '@nx-nestjs-typeorm/filters';
import { TodoModule } from '@nx-nestjs-typeorm/todo';
import { UserModule } from '@nx-nestjs-typeorm/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    FiltersModule,
    TodoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
