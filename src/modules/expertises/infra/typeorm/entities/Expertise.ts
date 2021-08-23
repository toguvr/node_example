import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import UserExpertise from '@modules/userExpertises/infra/typeorm/entities/UserExpertise';
import Price from '@modules/prices/infra/typeorm/entities/Price';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('expertise')
export default class Expertise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserExpertise, userExpertise => userExpertise.expertise)
  userExpertises: UserExpertise[];

  @OneToMany(() => Appointment, appointment => appointment.expertise)
  appointments: Appointment[];

  @OneToMany(() => Price, prices => prices.expertise)
  prices: Price[];
}
