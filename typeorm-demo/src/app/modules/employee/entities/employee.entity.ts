import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact_info.entity';
import { Task } from '@modules/task/entities/task.entity';
import { Meeting } from '@modules/meeting/entities/meeting.entity';

@ObjectType()
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field()
  address: string;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  @Field(() => ContactInfo)
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee)
  @Field(() => [Task])
  tasks: Task[];

  @ManyToOne(() => Employee, (employee) => employee.subordinates, {
    onDelete: 'SET NULL',
  })
  @Field(() => Employee, { nullable: true })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  @Field(() => [Employee])
  subordinates: Employee[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinColumn()
  @Field(() => [Meeting])
  meetings: Meeting[];
}
