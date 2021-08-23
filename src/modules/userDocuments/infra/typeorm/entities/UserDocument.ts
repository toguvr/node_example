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
import uploadConfig from '@config/upload';

import Users from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Index('user_document_user_id_fk', ['user_id'], {})
@Entity('userDocument')
export default class UserDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  document: string;

  @Column({ nullable: true })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, users => users.userDocuments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @Expose({ name: 'document_url' })
  getDocumentUrl(): string | null {
    if (!this.document) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.document}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.document}`;
      default:
        return null;
    }
  }
}
