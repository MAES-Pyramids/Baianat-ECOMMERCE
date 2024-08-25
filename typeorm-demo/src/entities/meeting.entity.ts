import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  isCancelled: boolean;

  @Column()
  zoomUrl: string;
}
