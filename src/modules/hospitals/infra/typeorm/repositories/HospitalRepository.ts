import { Repository, getRepository } from 'typeorm';

import ICreateHospitalDTO from '@modules/hospitals/dtos/ICreateHospitalDTO';
import IHospitalRepository from '@modules/hospitals/repositories/IHospitalRepository';
import Hospital from '../entities/Hospital';

class HospitalRepository implements IHospitalRepository {
  private ormRepository: Repository<Hospital>;

  constructor() {
    this.ormRepository = getRepository(Hospital);
  }

  public async findAllHospitals(): Promise<Hospital[]> {
    const hospital = await this.ormRepository.find();

    return hospital;
  }

  public async findByName(name: string): Promise<Hospital | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { name },
    });

    return hospital;
  }

  public async findById(id: string): Promise<Hospital | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(dataData: ICreateHospitalDTO): Promise<Hospital> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(data: Hospital): Promise<Hospital> {
    return this.ormRepository.save(data);
  }

  public async delete(data: Hospital): Promise<Hospital> {
    return this.ormRepository.remove(data);
  }
}

export default HospitalRepository;
