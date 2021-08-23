import Price from '../infra/typeorm/entities/AppointmentSolicitation';
import ICreateAppointmentSolicitationDTO from '../dtos/ICreateAppointmentSolicitationDTO';

export default interface IAppointmentSolicitationRepository {
  create(data: ICreateAppointmentSolicitationDTO): Promise<Price>;
  findById(id: string): Promise<Price | undefined>;
  findByUserIdAndAppointmentId(
    user_id: string,
    apponintment_id: string,
  ): Promise<Price | undefined>;
  findAll(): Promise<Price[]>;
  save(plan: Price): Promise<Price>;
  delete(plan: Price): Promise<Price>;
}
