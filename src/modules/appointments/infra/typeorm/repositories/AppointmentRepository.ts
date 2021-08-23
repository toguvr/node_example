import { Repository, getRepository, MoreThanOrEqual } from 'typeorm';

import IAppointmentRepository from '../../../repositories/IAppointmentRepository';
import ICreateAppointmentlDTO from '../../../dtos/ICreateAppointmentlDTO';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findNextFromUserId(
    user_id: string,
  ): Promise<Appointment | undefined> {
    const item = await this.ormRepository.findOne({
      where: { user_id, stop_checkin: null, date: MoreThanOrEqual(new Date()) },
      order: {
        date: 'DESC',
      },
    });

    return item;
  }

  public async findByExpertise(expertise_id: string): Promise<Appointment[]> {
    const item = await this.ormRepository.find({
      where: {
        expertise_id,
        transfering: true,
        date: MoreThanOrEqual(new Date()),
      },
    });

    return item;
  }

  public async findAll(): Promise<Appointment[]> {
    const item = await this.ormRepository.find();

    return item;
  }

  public async findByName(name: string): Promise<Appointment | undefined> {
    const hospital = await this.ormRepository.findOne({
      where: { name },
    });

    return hospital;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(dataData: ICreateAppointmentlDTO): Promise<Appointment> {
    const data = this.ormRepository.create(dataData);

    await this.ormRepository.save(data);

    return data;
  }

  public async save(data: Appointment): Promise<Appointment> {
    return this.ormRepository.save(data);
  }

  public async delete(data: Appointment): Promise<Appointment> {
    return this.ormRepository.remove(data);
  }
}

export default AppointmentRepository;
