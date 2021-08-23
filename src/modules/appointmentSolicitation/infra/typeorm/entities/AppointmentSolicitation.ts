import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import Hospital from '@modules/hospitals/infra/typeorm/entities/Hospital';
import Expertise from '@modules/expertises/infra/typeorm/entities/Expertise';
import Users from '@modules/users/infra/typeorm/entities/User';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Index('appointment_soliciation_user_id_fk', ['user_id'], {})
@Index('appointment_soliciation_appointment_id_fk', ['appointment_id'], {})
@Entity('appointmentSolicitation')
export default class AppointmentSolicitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  appointment_id: string;

  @Column({ default: true })
  accepted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, users => users.appointmentSolicitations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(
    () => Appointment,
    appointments => appointments.appointmentSolicitations,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'appointment_id', referencedColumnName: 'id' }])
  appointment: Appointment;
}
