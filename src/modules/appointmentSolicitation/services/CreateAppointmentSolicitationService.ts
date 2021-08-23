import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IExpertiseRepository from '@modules/expertises/repositories/IExpertiseRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IAppointmentSolicitationRepository from '../repositories/IAppointmentSolicitationRepository';
import Price from '../infra/typeorm/entities/AppointmentSolicitation';

interface IRequest {
  user_id: string;
  appointment_id: string;
  user_to_appointment_id: string;
}

interface IUpdateRequest {
  appointmentSolicitation_id: string;
  user_id: string;
  appointment_id: string;
  user_to_appointment_id: string;
}

@injectable()
class CreateAppointmentSolicitationService {
  constructor(
    @inject('ExpertiseRepository')
    private expertiseRepository: IExpertiseRepository,

    @inject('AppointmentSolicitationRepository')
    private appointmentSolicitationRepository: IAppointmentSolicitationRepository,

    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    appointmentSolicitation_id,
  }: {
    user_id: string;
    appointmentSolicitation_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const item = await this.appointmentSolicitationRepository.findById(
      appointmentSolicitation_id,
    );

    if (!item) {
      throw new AppError('Solicitação de agendamento não existente.');
    }

    await this.appointmentSolicitationRepository.delete(item);
  }

  public async showAll(): Promise<Price[]> {
    const prices = await this.appointmentSolicitationRepository.findAll();

    return prices;
  }

  public async showById(
    appointmentSolicitation_id: string,
  ): Promise<Price | undefined> {
    const appointmentSolicitation = await this.appointmentSolicitationRepository.findById(
      appointmentSolicitation_id,
    );

    if (!appointmentSolicitation) {
      throw new AppError('Solicitação de agendamento não existe.');
    }

    return appointmentSolicitation;
  }

  public async execute({
    appointment_id,
    user_to_appointment_id,
    user_id,
  }: IRequest): Promise<Price> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const user_to_appointment = await this.usersRepository.findById(
      user_to_appointment_id,
    );

    if (!user_to_appointment) {
      throw new AppError('Admin não existente.');
    }

    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Agendamento não existente.');
    }

    const existItem = await this.appointmentSolicitationRepository.findByUserIdAndAppointmentId(
      user_to_appointment_id,
      appointment_id,
    );

    if (existItem) {
      throw new AppError(
        'Já existe uma solicitação deste usuário para este agendamento.',
      );
    }

    const userSolicitation = await this.appointmentSolicitationRepository.create(
      {
        user_id: user_to_appointment_id,
        appointment_id,
      },
    );

    return userSolicitation;
  }

  public async update({
    appointmentSolicitation_id,
    appointment_id,
    user_to_appointment_id,
    user_id,
  }: IUpdateRequest): Promise<Price> {
    const appointmentSolicitation = await this.appointmentSolicitationRepository.findById(
      appointmentSolicitation_id,
    );

    if (!appointmentSolicitation) {
      throw new AppError('Solicitação de agendamento não existente.');
    }
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const user_to_appointment = await this.usersRepository.findById(
      user_to_appointment_id,
    );

    if (!user_to_appointment) {
      throw new AppError('Admin não existente.');
    }

    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Agendamento não existente.');
    }

    const existItem = await this.appointmentSolicitationRepository.findByUserIdAndAppointmentId(
      user_to_appointment_id,
      appointment_id,
    );

    if (existItem) {
      throw new AppError(
        'Já existe uma solicitação deste usuário para este agendamento.',
      );
    }

    appointmentSolicitation.appointment_id = appointment_id;
    appointmentSolicitation.user_id = user_to_appointment_id;

    await this.appointmentSolicitationRepository.save(appointmentSolicitation);

    return appointmentSolicitation;
  }
}

export default CreateAppointmentSolicitationService;
