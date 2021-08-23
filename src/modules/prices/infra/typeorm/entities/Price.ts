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

@Index('price_hospital_hospital_id_fk', ['hospital_id'], {})
@Index('price_expertise_expertise_id_fk', ['expertise_id'], {})
@Entity('price')
export default class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expertise_id: string;

  @Column()
  hospital_id: string;

  @Column()
  doctor_price: number;

  @Column()
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Hospital, hospitals => hospitals.prices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'hospital_id', referencedColumnName: 'id' }])
  hospital: Hospital;

  @ManyToOne(() => Expertise, expertises => expertises.prices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'expertise_id', referencedColumnName: 'id' }])
  expertise: Expertise;
}
