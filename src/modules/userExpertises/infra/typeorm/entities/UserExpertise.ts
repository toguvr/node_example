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
import User from '@modules/users/infra/typeorm/entities/User';
import Expertise from '@modules/expertises/infra/typeorm/entities/Expertise';

@Index('userexpertise_expertise_id_fk', ['expertise_id'], {})
@Index('userexpertise_user_id_fk', ['user_id'], {})
@Entity('userExpertise')
export default class UserExpertise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expertise_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, users => users.userExpertises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Expertise, users => users.userExpertises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'expertise_id', referencedColumnName: 'id' }])
  expertise: Expertise;
}
