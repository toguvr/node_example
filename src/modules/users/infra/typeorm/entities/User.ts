import {
  Entity,
  Column,
  OneToMany,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import Usertoken from '@modules/users/infra/typeorm/entities/UserToken';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import UserDocument from '@modules/userDocuments/infra/typeorm/entities/UserDocument';
import UserExpertise from '@modules/userExpertises/infra/typeorm/entities/UserExpertise';
import AppointmentSolicitation from '@modules/appointmentSolicitation/infra/typeorm/entities/AppointmentSolicitation';
import Refreshtoken from './RefreshToken';

@Index('email', ['email'], { unique: true })
@Index('cpf', ['cpf'], { unique: true })
@Index('crm', ['crm'], { unique: true })
@Index('rg', ['rg'], { unique: true })
@Index('cellphone', ['cellphone'], { unique: true })
@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  crm: string;

  @Column({ unique: true, nullable: true })
  rg: string;

  @Column({ unique: true, nullable: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  sus: string;

  @Column({ nullable: true })
  bank: string;

  @Column({ nullable: true })
  agency: string;

  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  cep: number;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  uf: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: true })
  cellphone: string;

  @Column({ nullable: true })
  birthday: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserExpertise, userExpertise => userExpertise.user)
  userExpertises: UserExpertise[];

  @OneToMany(() => Appointment, appointments => appointments.user)
  appointments: Appointment[];

  @OneToMany(() => Usertoken, usertoken => usertoken.user)
  usertokens: Usertoken[];

  @OneToMany(() => Refreshtoken, usertoken => usertoken.user)
  refreshtokens: Refreshtoken[];

  @OneToMany(() => UserDocument, userDocuments => userDocuments.user)
  userDocuments: UserDocument[];

  @OneToMany(
    () => AppointmentSolicitation,
    appointmentSolicitation => appointmentSolicitation.user,
  )
  appointmentSolicitations: AppointmentSolicitation[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
