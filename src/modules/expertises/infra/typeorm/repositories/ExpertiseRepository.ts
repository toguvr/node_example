import { Repository, getRepository } from 'typeorm';

import IExpertiseRepository from '../../../repositories/IExpertiseRepository';
import ICreateExpertiselDTO from '../../../dtos/ICreateExpertiselDTO';

import Expertise from '../entities/Expertise';

class ExpertiseRepository implements IExpertiseRepository {
  private ormRepository: Repository<Expertise>;

  constructor() {
    this.ormRepository = getRepository(Expertise);
  }

  public async findAll(): Promise<Expertise[]> {
    const item = await this.ormRepository.find();

    return item;
  }

  public async findByName(name: string): Promise<Expertise | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { name },
    });

    return hospital;
  }

  public async findById(id: string): Promise<Expertise | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(dataData: ICreateExpertiselDTO): Promise<Expertise> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(data: Expertise): Promise<Expertise> {
    return this.ormRepository.save(data);
  }

  public async delete(data: Expertise): Promise<Expertise> {
    return this.ormRepository.remove(data);
  }
}

export default ExpertiseRepository;
