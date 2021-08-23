import Hospital from '../infra/typeorm/entities/Hospital';
import ICreateInvitedDTO from '../dtos/ICreateHospitalDTO';

export default interface IHospitalRepository {
  create(data: ICreateInvitedDTO): Promise<Hospital>;
  findById(id: string): Promise<Hospital | undefined>;
  findByName(name: string): Promise<Hospital | undefined>;
  findAllHospitals(): Promise<Hospital[]>;
  save(plan: Hospital): Promise<Hospital>;
  delete(plan: Hospital): Promise<Hospital>;
}
