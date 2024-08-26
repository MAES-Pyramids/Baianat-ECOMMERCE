import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: '123',
  database: 'TypeORMDemo',
  entities: ['dist/src/app/modules/**/*.entity.{ts,js}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
