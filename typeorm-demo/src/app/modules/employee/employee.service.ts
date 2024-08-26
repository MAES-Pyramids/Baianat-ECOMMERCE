import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact_info.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput) {
    const employee = await this.employeeRepository.create(createEmployeeInput);
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async findEmployeeByTaskId(taskId: number) {
    return this.employeeRepository.find({
      where: { tasks: { id: taskId } },
      relations: ['tasks'],
    });
  }
}
