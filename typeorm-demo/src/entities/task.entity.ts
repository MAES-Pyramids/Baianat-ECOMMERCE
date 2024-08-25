import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
