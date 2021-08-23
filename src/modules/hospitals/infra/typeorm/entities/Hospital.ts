import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Price from '@modules/prices/infra/typeorm/entities/Price';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('hospital')
export default class Hospital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logradouro: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointment, appointment => appointment.hospital)
  appointments: Appointment[];

  @OneToMany(() => Price, prices => prices.hospital)
  prices: Price[];
}
