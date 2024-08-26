import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '@modules/employee/entities/employee.entity';

@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.tasks, {
    onDelete: 'SET NULL',
  })
  @Field(() => Employee, { nullable: true })
  employee: Employee;
}
