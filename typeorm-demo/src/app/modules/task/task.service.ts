import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeId: number, TaskInput: { name: string }) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) return new HttpException('Employee not found', 404);

    const task = this.taskRepository.create({ ...TaskInput, employee });
    return this.taskRepository.save(task);
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async findTaskByEmployeeId(employeeId: number) {
    return this.taskRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['employee'],
    });
  }
}
