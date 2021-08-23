import { Repository, getRepository } from 'typeorm';

import IUserExpertiseRepository from '../../../repositories/IUserExpertiseRepository';
import ICreateUserExpertiseDTO from '../../../dtos/ICreateUserExpertiseDTO';

import UserExpertise from '../entities/UserExpertise';

class UserExpertiseRepository implements IUserExpertiseRepository {
  private ormRepository: Repository<UserExpertise>;

  constructor() {
    this.ormRepository = getRepository(UserExpertise);
  }

  public async findAll(): Promise<UserExpertise[]> {
    const item = await this.ormRepository.find();

    return item;
  }

  public async findByExpertiseIdAndUserId(
    expertise_id: string,
    user_id: string,
  ): Promise<UserExpertise | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { expertise_id, user_id },
    });

    return hospital;
  }

  public async findById(id: string): Promise<UserExpertise | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    dataData: ICreateUserExpertiseDTO,
  ): Promise<UserExpertise> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(data: UserExpertise): Promise<UserExpertise> {
    return this.ormRepository.save(data);
  }

  public async delete(data: UserExpertise): Promise<UserExpertise> {
    return this.ormRepository.remove(data);
  }
}

export default UserExpertiseRepository;
