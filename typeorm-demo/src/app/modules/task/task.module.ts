import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Employee])],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
