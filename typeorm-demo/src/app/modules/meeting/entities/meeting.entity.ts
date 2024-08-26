import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '@modules/employee/entities/employee.entity';

@ObjectType()
export class Meeting {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  date: Date;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  isCancelled: boolean;

  @Column()
  @Field()
  zoomUrl: string;

  @ManyToMany(() => Employee, (employee) => employee.meetings)
  @Field(() => [Employee])
  attendees: Employee[];
}
