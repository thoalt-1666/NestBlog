import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE } from '../constants';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || DATABASE.DEFAULT_HOST,
  port: parseInt(process.env.DB_PORT || DATABASE.DEFAULT_PORT.toString()),
  username: process.env.DB_USERNAME || DATABASE.DEFAULT_USERNAME,
  password: process.env.DB_PASSWORD || DATABASE.DEFAULT_PASSWORD,
  database: process.env.DB_NAME || DATABASE.DEFAULT_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
