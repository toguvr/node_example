import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';
import Expertise from '@modules/expertises/infra/typeorm/entities/Expertise';
import Hospital from '@modules/hospitals/infra/typeorm/entities/Hospital';
import AppointmentSolicitation from '@modules/appointmentSolicitation/infra/typeorm/entities/AppointmentSolicitation';

@Index('appointments_user_hospital_id_fk', ['hospital_id'], {})
@Index('appointments_user_expertise_id_fk', ['expertise_id'], {})
@Index('appointments_user_user_id_fk', ['user_id'], {})
@Entity('appointment')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  hospital_id: string;

  @Column()
  expertise_id: string;

  @Column()
  title: string;

  @Column({ default: false })
  transfering: boolean;

  @Column({ nullable: true })
  start_checkin: Date;

  @Column({ nullable: true })
  stop_checkin: Date;

  @Column()
  doctor_price: number;

  @Column()
  total_price: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, users => users.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Expertise, expertise => expertise.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'expertise_id', referencedColumnName: 'id' }])
  expertise: Expertise;

  @ManyToOne(() => Hospital, hospital => hospital.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'hospital_id', referencedColumnName: 'id' }])
  hospital: Hospital;

  @OneToMany(() => AppointmentSolicitation, prices => prices.appointment)
  appointmentSolicitations: AppointmentSolicitation[];
}
