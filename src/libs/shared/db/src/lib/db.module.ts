import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@nx-nestjs-typeorm/todo';
import { User } from '@nx-nestjs-typeorm/user';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get<string>('DB_NAME'),
          host: configService.get<string>('DB_HOST'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT'),
          entities: [User, Todo],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbModule {}
