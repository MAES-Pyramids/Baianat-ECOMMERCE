import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EmployeeModule } from './app/modules/employee/employee.module';
import { TaskModule } from './app/modules/task/task.module';
import { MeetingModule } from './app/modules/meeting/meeting.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const depthLimit = require('graphql-depth-limit');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '123',
      database: 'BaianatDB',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'src/app/graphql/schema/schema.gql',
          ),
          validationRules: [depthLimit(6)],
          debug: true,
        };
      },
    }),
    EmployeeModule,
    TaskModule,
    MeetingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
