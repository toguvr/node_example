import Price from '../infra/typeorm/entities/Price';
import ICreateUserExpertiseDTO from '../dtos/ICreatePriceDTO';

export default interface IPriceRepository {
  create(data: ICreateUserExpertiseDTO): Promise<Price>;
  findById(id: string): Promise<Price | undefined>;
  findByExpertiseIdAndHospitalId(
    expertise_id: string,
    hospital_id: string,
  ): Promise<Price | undefined>;
  findAll(): Promise<Price[]>;
  save(plan: Price): Promise<Price>;
  delete(plan: Price): Promise<Price>;
}
