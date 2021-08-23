import { Repository, getRepository, Raw } from 'typeorm';

import ICreateTrainingDTO from '@modules/userDocuments/dtos/ICreateUserDocumentDTO';
import IUserDocumentRepository from '@modules/userDocuments/repositories/IUserDocumentRepository';
import UserDocument from '../entities/UserDocument';

class UserDocumentRepository implements IUserDocumentRepository {
  private ormRepository: Repository<UserDocument>;

  constructor() {
    this.ormRepository = getRepository(UserDocument);
  }

  public async findByType(type: string): Promise<UserDocument | undefined> {
    const document = await this.ormRepository.findOne({
      relations: ['user'],
      where: { type },
    });

    return document;
  }

  public async findById(id: string): Promise<UserDocument | undefined> {
    const plan = await this.ormRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    return plan;
  }

  public async findAllByUserId(user_id: string): Promise<UserDocument[]> {
    const plan = await this.ormRepository.find({
      relations: ['user'],
      where: { user_id },
      order: {
        created_at: 'DESC',
      },
    });

    return plan;
  }

  public async create(planData: ICreateTrainingDTO): Promise<UserDocument> {
    const plan = this.ormRepository.create(planData);

    await this.ormRepository.save(plan);

    return plan;
  }

  public async save(plan: UserDocument): Promise<UserDocument> {
    return this.ormRepository.save(plan);
  }

  public async delete(plan: UserDocument): Promise<UserDocument> {
    return this.ormRepository.remove(plan);
  }
}

export default UserDocumentRepository;
