import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

const PostgresMigrationDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});

export default PostgresMigrationDataSource;
