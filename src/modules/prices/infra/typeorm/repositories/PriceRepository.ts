import { Repository, getRepository } from 'typeorm';

import IPriceRepository from '../../../repositories/IPriceRepository';
import ICreateUserExpertiseDTO from '../../../dtos/ICreatePriceDTO';

import Price from '../entities/Price';

class PriceRepository implements IPriceRepository {
  private ormRepository: Repository<Price>;

  constructor() {
    this.ormRepository = getRepository(Price);
  }

  public async findAll(): Promise<Price[]> {
    const item = await this.ormRepository.find();

    return item;
  }

  public async findByExpertiseIdAndHospitalId(
    expertise_id: string,
    hospital_id: string,
  ): Promise<Price | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { expertise_id, hospital_id },
    });

    return hospital;
  }

  public async findById(id: string): Promise<Price | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(dataData: ICreateUserExpertiseDTO): Promise<Price> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(data: Price): Promise<Price> {
    return this.ormRepository.save(data);
  }

  public async delete(data: Price): Promise<Price> {
    return this.ormRepository.remove(data);
  }
}

export default PriceRepository;
