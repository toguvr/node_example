import { Repository, getRepository } from 'typeorm';

import IAppointmentSolicitationRepository from '../../../repositories/IAppointmentSolicitationRepository';
import ICreateUserExpertiseDTO from '../../../dtos/ICreateAppointmentSolicitationDTO';

import AppointmentSolicitation from '../entities/AppointmentSolicitation';

class AppointmentSolicitationRepository
  implements IAppointmentSolicitationRepository {
  private ormRepository: Repository<AppointmentSolicitation>;

  constructor() {
    this.ormRepository = getRepository(AppointmentSolicitation);
  }

  public async findAll(): Promise<AppointmentSolicitation[]> {
    const item = await this.ormRepository.find();

    return item;
  }

  public async findByUserIdAndAppointmentId(
    user_id: string,
    appointment_id: string,
  ): Promise<AppointmentSolicitation | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { user_id, appointment_id },
    });

    return hospital;
  }

  public async findById(
    id: string,
  ): Promise<AppointmentSolicitation | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    dataData: ICreateUserExpertiseDTO,
  ): Promise<AppointmentSolicitation> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(
    data: AppointmentSolicitation,
  ): Promise<AppointmentSolicitation> {
    return this.ormRepository.save(data);
  }

  public async delete(
    data: AppointmentSolicitation,
  ): Promise<AppointmentSolicitation> {
    return this.ormRepository.remove(data);
  }
}

export default AppointmentSolicitationRepository;
