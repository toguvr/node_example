import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentlDTO from '../dtos/ICreateAppointmentlDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentlDTO): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  findNextFromUserId(user_id: string): Promise<Appointment | undefined>;
  findByName(name: string): Promise<Appointment | undefined>;
  findAll(): Promise<Appointment[]>;
  findByExpertise(expertise_id: string): Promise<Appointment[]>;
  save(plan: Appointment): Promise<Appointment>;
  delete(plan: Appointment): Promise<Appointment>;
}
