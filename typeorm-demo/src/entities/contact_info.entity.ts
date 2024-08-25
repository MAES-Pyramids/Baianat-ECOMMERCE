import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;
}
