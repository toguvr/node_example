import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IExpertiseRepository from '@modules/expertises/repositories/IExpertiseRepository';
import IHospitalRepository from '@modules/hospitals/repositories/IHospitalRepository';
import IPriceRepository from '@modules/prices/repositories/IPriceRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  user_id: string;
  user_appointment_id: string;
  hospital_id: string;
  expertise_id: string;
  title: string;
  date: Date;
}

interface IUpdateRequest {
  appointment_id: string;
  user_id: string;
  user_appointment_id: string;
  hospital_id: string;
  expertise_id: string;
  title: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('ExpertiseRepository')
    private expertiseRepository: IExpertiseRepository,

    @inject('PriceRepository')
    private priceRepository: IPriceRepository,

    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    appointment_id,
  }: {
    user_id: string;
    appointment_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Agendamento não existente.');
    }

    await this.appointmentRepository.delete(appointment);
  }

  public async showAll(): Promise<Appointment[]> {
    const hospitals = await this.appointmentRepository.findAll();

    return hospitals;
  }

  public async showById(
    appointment_id: string,
  ): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Agendamento não existente.');
    }

    return appointment;
  }

  public async showMyNext(user_id: string): Promise<Appointment | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    const appointment = await this.appointmentRepository.findNextFromUserId(
      user_id,
    );

    if (!appointment) {
      throw new AppError('Agendamento não existente.');
    }

    return appointment;
  }

  public async showByExpertisesAdverts(
    expertise_id: string,
  ): Promise<Appointment[]> {
    const appointment = await this.appointmentRepository.findByExpertise(
      expertise_id,
    );

    return appointment;
  }

  public async execute({
    user_id,
    user_appointment_id,
    hospital_id,
    expertise_id,
    title,
    date,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const userToAppointment = await this.usersRepository.findById(
      user_appointment_id,
    );

    if (!userToAppointment) {
      throw new AppError('Usuário não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    const price = await this.priceRepository.findByExpertiseIdAndHospitalId(
      expertise_id,
      hospital_id,
    );

    if (!price) {
      throw new AppError(
        'Preço não cadastrado para esta especialidade neste hospital.',
      );
    }

    const appointment = await this.appointmentRepository.create({
      user_id: user_appointment_id,
      hospital_id,
      expertise_id,
      title,
      date,
      doctor_price: price.doctor_price,
      total_price: price.total_price,
    });

    return appointment;
  }

  public async update({
    user_id,
    appointment_id,
    user_appointment_id,
    hospital_id,
    expertise_id,
    title,
    date,
  }: IUpdateRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const userToAppointment = await this.usersRepository.findById(
      user_appointment_id,
    );

    if (!userToAppointment) {
      throw new AppError('Usuário não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    const price = await this.priceRepository.findByExpertiseIdAndHospitalId(
      expertise_id,
      hospital_id,
    );

    if (!price) {
      throw new AppError(
        'Preço não cadastrado para esta especialidade neste hospital.',
      );
    }

    const existItem = await this.appointmentRepository.findById(appointment_id);

    if (!existItem) {
      throw new AppError('Agendamento não existe.');
    }

    existItem.user_id = user_appointment_id;
    existItem.hospital_id = hospital_id;
    existItem.expertise_id = expertise_id;
    existItem.title = title;
    existItem.date = date;

    await this.appointmentRepository.save(existItem);

    return existItem;
  }
}

export default CreateAppointmentService;
