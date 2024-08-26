import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@ObjectType()
@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @OneToOne(() => Employee, (employee) => employee.contactInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => Employee)
  employee: Employee;
}
