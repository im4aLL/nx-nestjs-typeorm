import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Todo, User } from '../../src/entities';

config({
  path: 'apps/test/.env',
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  database: configService.get<string>('DB_NAME'),
  host: configService.get<string>('DB_HOST'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  port: configService.get<number>('DB_PORT'),
  entities: [User, Todo],
  synchronize: false,
  migrations: ['typeorm/test/migrations/**'],
});
