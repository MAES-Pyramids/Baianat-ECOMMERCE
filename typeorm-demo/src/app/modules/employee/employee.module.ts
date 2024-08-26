import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo])],
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}
