import Expertise from '../infra/typeorm/entities/Expertise';
import ICreateInvitedDTO from '../dtos/ICreateExpertiselDTO';

export default interface IExpertiseRepository {
  create(data: ICreateInvitedDTO): Promise<Expertise>;
  findById(id: string): Promise<Expertise | undefined>;
  findByName(name: string): Promise<Expertise | undefined>;
  findAll(): Promise<Expertise[]>;
  save(plan: Expertise): Promise<Expertise>;
  delete(plan: Expertise): Promise<Expertise>;
}
